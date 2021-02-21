package handlers

import (
	"fmt"
	oauth1Login "github.com/dghubble/gologin/v2/oauth1"
	"github.com/dghubble/gologin/v2/twitter"
	"github.com/dghubble/oauth1"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

func Login(config *oauth1.Config, s *repositories.Server) func(ctx *gin.Context) {
	return gin.WrapH(twitter.LoginHandler(config, onFailToLogin()))
}

func LoginCallback(config *oauth1.Config, s *repositories.Server, isDebug bool) func(ctx *gin.Context) {
	return gin.WrapH(twitter.CallbackHandler(config, onCompleteTwitterLogin(s.UserStore, isDebug), nil))
}

func onFailToLogin() http.Handler {
	fn := func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("error")
		http.SetCookie(w, &http.Cookie{})
		http.Redirect(w, req, "/app/login", http.StatusFound)
	}
	return http.HandlerFunc(fn)
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
		cookie := GenerateSessionCookie(ti, !isDebug)
		http.SetCookie(w, cookie)
		http.Redirect(w, req, "/main", http.StatusFound)
	}
	return http.HandlerFunc(fn)
}
