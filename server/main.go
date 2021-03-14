package main

import (
	"fmt"
	"github.com/dghubble/oauth1"
	twitterOAuth1 "github.com/dghubble/oauth1/twitter"
	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	"github.com/pistatium/emiru/handlers"
	"github.com/pistatium/emiru/impl/datastore"
	"github.com/pistatium/emiru/repositories"
	"log"
	"math/rand"
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

	server := repositories.NewServer(userStore, config.ConsumerKey, config.ConsumerSecret)

	g := gin.Default()
	g.Use(gin.Recovery())
	if env.StaticDir != "" {
		// FIXME:
		g.Static("/_next", fmt.Sprintf("%s/_next", env.StaticDir))
		g.Static("/images", fmt.Sprintf("%s/images", env.StaticDir))
		g.StaticFile("/favicon.ico", fmt.Sprintf("%s/favicon.ico", env.StaticDir))
		g.StaticFile("/privacy_policy.html", fmt.Sprintf("%s/privacy_policy.html", env.StaticDir))
		g.StaticFile("/manifest.json", fmt.Sprintf("%s/manifest.json", env.StaticDir))
		g.StaticFile("/", fmt.Sprintf("%s/index.html", env.StaticDir))
		g.StaticFile("/main", fmt.Sprintf("%s/main.html", env.StaticDir))
	}
	g.GET("/app/login", handlers.Login(config, server))
	g.GET("/app/callback", handlers.LoginCallback(config, server, env.IsDebug))

	api := g.Group("/app/api")
	api.Use(handlers.LoginMiddleware(server))
	{
		api.GET("users/me", handlers.GetCurrentUser(server))

		api.GET("tweets", handlers.GetTweets(server))

		api.PUT("favorite", handlers.SetFavorite(server))
		api.DELETE("favorite", handlers.UnsetFavorite(server))

		api.PUT("retweet", handlers.SetRetweet(server))
		api.DELETE("retweet", handlers.UnSetRetweet(server))
	}
	err = g.Run(fmt.Sprintf("0.0.0.0:%s", env.Port))
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

