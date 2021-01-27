package main

import (
	"fmt"
	oauth1Login "github.com/dghubble/gologin/v2/oauth1"
	"github.com/dghubble/gologin/v2/twitter"
	"github.com/dghubble/oauth1"
	twitterOAuth1 "github.com/dghubble/oauth1/twitter"
	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	"github.com/pistatium/emiru/impl/snowflake"
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
	idGenerator, err := snowflake.New(int64(rand.Intn(1024)))
	if err != nil {
		log.Fatal(err.Error())
	}

	config := &oauth1.Config{
		ConsumerKey:    env.TwitterConsumerKey,
		ConsumerSecret: env.TwitterConsumerSecret,
		CallbackURL:    env.AppURL + "/app/callback",
		Endpoint:       twitterOAuth1.AuthorizeEndpoint,
	}
	g := gin.Default()
	g.GET("/app/login",  gin.WrapH(twitter.LoginHandler(config, nil)))
	g.GET("/app/callback", gin.WrapH(twitter.CallbackHandler(config, issueSession(idGenerator), nil)))
	err = g.Run(fmt.Sprintf("0.0.0.0:%s", env.Port))
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func issueSession(idGenerator repositories.UniqueIDGenerator) http.Handler {
	fn := func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		accessToken, accessSecret, err := oauth1Login.AccessTokenFromContext(ctx)
		twitterUser, err := twitter.UserFromContext(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		user := repositories.NewUser(idGenerator, twitterUser.ScreenName, accessToken, accessSecret)
		fmt.Println(user)
		http.Redirect(w, req, "/", http.StatusFound)
	}
	return http.HandlerFunc(fn)
}
