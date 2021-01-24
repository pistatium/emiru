package main

import (
	"fmt"
	"github.com/dghubble/gologin/v2/twitter"
	twitterOAuth1 "github.com/dghubble/oauth1/twitter"
	"github.com/dghubble/oauth1"
	"github.com/kelseyhightower/envconfig"
	"log"
	"net/http"
)

func main() {
	var env Env
	err := envconfig.Process("", &env)
	if err != nil {
		log.Fatal(err.Error())
	}

	config := &oauth1.Config{
		ConsumerKey:    env.TwitterConsumerKey,
		ConsumerSecret: env.TwitterConsumerSecret,
		CallbackURL:    "http://localhost:8080/callback",
		Endpoint:       twitterOAuth1.AuthorizeEndpoint,
	}
	mux := http.NewServeMux()
	mux.Handle("/login", twitter.LoginHandler(config, nil))
	mux.Handle("/callback", twitter.CallbackHandler(config, issueSession(), nil))
	err = http.ListenAndServe("localhost:8080", mux)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func issueSession() http.Handler {
	fn := func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		twitterUser, err := twitter.UserFromContext(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Println(twitterUser)
		//// 2. Implement a success handler to issue some form of session
		//session := sessionStore.New(sessionName)
		//session.Values[sessionUserKey] = twitterUser.ID
		//session.Values[sessionUsername] = twitterUser.ScreenName
		//session.Save(w)
		http.Redirect(w, req, "/", http.StatusFound)
	}
	return http.HandlerFunc(fn)
}
