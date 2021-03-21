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
	"io/ioutil"
	"log"
	"math/rand"
	"path/filepath"
	"strings"
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
		// try files
		for _, file := range dirwalk(env.StaticDir) {
			alias := strings.Replace(file, env.StaticDir, "",  1)
			if strings.HasSuffix(file, ".html") {
				alias = alias[:len(alias) - 5]
			}
			if alias == "/index" {
				alias = "/"
			}
			g.StaticFile(alias, file)
		}
	}
	g.GET("/app/login", handlers.Login(config, server))
	g.GET("/app/callback", handlers.LoginCallback(config, server, env.IsDebug))

	api := g.Group("/app/api")
	api.Use(handlers.LoginMiddleware(server))
	{
		api.GET("users/me", handlers.GetCurrentUser(server))

		api.GET("tweets", handlers.GetTweets(server))
		api.GET("lists", handlers.GetLists(server))

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

func dirwalk(dir string) []string {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		fmt.Println("failed to load files", err)
		return make([]string, 0)
	}

	var paths []string
	for _, file := range files {
		if file.IsDir() {
			paths = append(paths, dirwalk(filepath.Join(dir, file.Name()))...)
			continue
		}
		paths = append(paths, filepath.Join(dir, file.Name()))
	}

	return paths
}
