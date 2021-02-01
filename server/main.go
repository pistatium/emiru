package main

import (
	"fmt"
	oauth1Login "github.com/dghubble/gologin/v2/oauth1"
	"github.com/dghubble/gologin/v2/twitter"
	"github.com/dghubble/oauth1"
	twitterOAuth1 "github.com/dghubble/oauth1/twitter"
	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	"github.com/pistatium/emiru/impl/datastore"
	"github.com/pistatium/emiru/repositories"
	"log"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	var env Env
	err := envconfig.Process("", &env)
	if err != nil {
		log.Fatal(err.Error())
	}

	rand.Seed(time.Now().UnixNano())

	userStore := datastore.NewUserStore(env.DatastoreProjectID)

	config := &oauth1.Config{
		ConsumerKey:    env.TwitterConsumerKey,
		ConsumerSecret: env.TwitterConsumerSecret,
		CallbackURL:    env.AppURL + "/app/callback",
		Endpoint:       twitterOAuth1.AuthorizeEndpoint,
	}
	if !env.IsDebug {
		gin.SetMode(gin.ReleaseMode)
	}
	server := NewServer(userStore)

	g := gin.Default()
	g.Use(gin.Recovery())
	g.Use(server.LoginMiddleware())
	g.GET("/app/login",  gin.WrapH(twitter.LoginHandler(config, nil)))
	g.GET("/app/callback", gin.WrapH(twitter.CallbackHandler(config, onCompleteTwitterLogin(userStore, env.IsDebug), nil)))
	g.GET("/app/api/users/me", server.GetCurrentUser)
	err = g.Run(fmt.Sprintf("0.0.0.0:%s", env.Port))
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func onCompleteTwitterLogin(userStore repositories.UserStore, isDebug bool) http.Handler {
	fn := func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		accessToken, accessSecret, err := oauth1Login.AccessTokenFromContext(ctx)
		twitterUser, err := twitter.UserFromContext(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		userID := repositories.IdFromTwitter(twitterUser.ID)

		user := repositories.NewUser(userID, twitterUser.ScreenName, accessToken, accessSecret)
		err = userStore.Save(ctx, user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		ti := &TokenInfo{
			UserID:   user.ID,
			Secret:   user.Secret,
		}
		cookie := generateSessionCookie(ti, !isDebug)
		http.SetCookie(w, cookie)
		http.Redirect(w, req, "/", http.StatusFound)
	}
	return http.HandlerFunc(fn)
}
