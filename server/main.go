package main

import (
	"fmt"
	"github.com/dghubble/gologin/v2/twitter"
	twitterOAuth1 "github.com/dghubble/oauth1/twitter"
	oauth1Login "github.com/dghubble/gologin/v2/oauth1"
	"github.com/dghubble/oauth1"
	"github.com/kelseyhightower/envconfig"
	"github.com/pistatium/emiru/impl/snowflake"
	"github.com/pistatium/emiru/repositories"
	"log"
	"math/rand"
	"net/http"
	"github.com/gin-gonic/gin"
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
		CallbackURL:    "http://localhost:8080/callback",
		Endpoint:       twitterOAuth1.AuthorizeEndpoint,
	}
	g := gin.Default()
	g.GET("/login",  gin.WrapH(twitter.LoginHandler(config, nil)))
	g.GET("/callback", gin.WrapH(twitter.CallbackHandler(config, issueSession(idGenerator), nil)))
	err = g.Run("localhost:8080")
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
