package main

import (
	"fmt"
	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"net/http"
	"strconv"
)

type Server struct {
	userStore           repositories.UserStore
	twitterClientKey    string
	twitterClientSecret string
}

func NewServer(userStore repositories.UserStore, twitterClientKey string, twitterClientSecret string) *Server {
	return &Server{
		userStore:           userStore,
		twitterClientKey:    twitterClientKey,
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

type GetTweetResponse struct {
	Tweets []*entities.Tweet `json:"tweets"`
}

func (s *Server) GetTweets(ctx *gin.Context) {
	sinceID, _ := strconv.ParseInt(ctx.Query("since_id"), 10, 64)
	maxID, _ := strconv.ParseInt(ctx.Query("max_id"), 10, 64)
	if maxID != 0 {
		maxID -= 1
		println(maxID)
	}
	user := ctx.MustGet(ContextUserKey).(*entities.User)
	c := oauth1.NewConfig(s.twitterClientKey, s.twitterClientSecret)
	t := oauth1.NewToken(user.TwitterAccessKey, user.TwitterAccessSecret)
	httpClient := c.Client(ctx.Request.Context(), t)

	twClient := twitter.NewClient(httpClient)
	tweets, _, err := twClient.Timelines.HomeTimeline(&twitter.HomeTimelineParams{
		Count:              200,
		SinceID:            sinceID,
		MaxID: maxID,
		ExcludeReplies:     twitter.Bool(true),
		ContributorDetails: nil,
		IncludeEntities:    twitter.Bool(true),
		TweetMode:          "extended",
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	resTweets := make([]*entities.Tweet, 0)
	for i, _ := range tweets {
		tweet := parseTweet(&tweets[i])
		if tweet == nil || len(tweet.Images) == 0 {
			continue
		}

		resTweets = append(resTweets, tweet)
	}
	ctx.JSON(http.StatusOK, GetTweetResponse{
		Tweets: resTweets,
	})

	return
}

func parseTweet(tw *twitter.Tweet) *entities.Tweet {
	status := entities.TweetStatus{}
	if tw.RetweetedStatus != nil {
		status.RetweetedBy = &entities.TweetUser{
			Name:    tw.User.ScreenName,
			Icon:    tw.User.ProfileImageURLHttps,
			Profile: tw.User.Description,
		}
		tw = tw.RetweetedStatus
	}
	images := make([]*entities.Image, 0)
	for j, _ := range tw.Entities.Media {
		media := tw.Entities.Media[j]
		images = append(images, &entities.Image{
			Url: media.MediaURLHttps,
		})
	}
	createdAt, err := tw.CreatedAtTime()
	if err != nil {
		return nil
	}
	status.IsFollowing = tw.User.Following
	return &entities.Tweet{
		ID:   tw.IDStr,
		URL:  fmt.Sprintf("https://twitter.com/%s/status/%s", tw.User.ScreenName, tw.IDStr),
		Text: tw.FullText,
		Author: &entities.TweetUser{
			Name:    tw.User.Name,
			Icon:    tw.User.ProfileImageURLHttps,
			Profile: tw.User.Description,
		},
		Images:    images,
		CreatedAt: createdAt,
		Status:    &status,
	}
}
