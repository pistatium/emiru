package main

import (
	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

type Server struct {
	userStore repositories.UserStore
	twitterClientKey string
	twitterClientSecret string
}

func NewServer(userStore repositories.UserStore, twitterClientKey string, twitterClientSecret string) *Server {
	return &Server{
		userStore: userStore,
		twitterClientKey: twitterClientKey,
		twitterClientSecret: twitterClientSecret,
	}
}

const ContextUserKey = "user"

func (s *Server) LoginMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		sess, err := ctx.Cookie(SessionCookieName)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			ctx.Abort()
			return
		}
		tokenInfo, err := NewFromToken(sess)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "unauthorized"})
			ctx.Abort()
			return
		}
		user, err := s.userStore.LoadFromID(ctx.Request.Context(), tokenInfo.UserID)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid token format"})
			ctx.Abort()
			return
		}
		if user.Secret != tokenInfo.Secret {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid auth session"})
			ctx.Abort()
			return
		}
		ctx.Set(ContextUserKey, user)
		ctx.Next()
	}
}

type GetCurrentUserResponse struct {
	UserID    string `json:"user_id"`
	Name      string `json:"name"`
	Thumbnail string `json:"thumbnail"`
}
func (s *Server) GetCurrentUser(ctx *gin.Context) {
	user := ctx.MustGet(ContextUserKey).(*entities.User)
	ctx.JSON(http.StatusOK, &GetCurrentUserResponse{
		UserID: user.ID,
		Name:   user.Name,
	})
	return
}

func (s *Server) GetTweets(ctx *gin.Context) {
	user := ctx.MustGet(ContextUserKey).(*entities.User)
	c := oauth1.NewConfig(s.twitterClientKey, s.twitterClientSecret)
	t := oauth1.NewToken(user.TwitterAccessKey, user.TwitterAccessSecret)
	httpClient := c.Client(ctx.Request.Context(), t)

	twClient := twitter.NewClient(httpClient)
	tweets, _, err := twClient.Timelines.HomeTimeline(&twitter.HomeTimelineParams{
		Count: 20,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, tweets)
	return
}
