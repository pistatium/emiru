package handlers

import (
	"github.com/dghubble/go-twitter/twitter"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"net/http"
	"strconv"
)

type GetTweetResponse struct {
	Tweets []*entities.Tweet `json:"tweets"`
}

func GetTweets(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		sinceID, _ := strconv.ParseInt(ctx.Query("since_id"), 10, 64)
		maxID, _ := strconv.ParseInt(ctx.Query("max_id"), 10, 64)
		if maxID != 0 {
			maxID -= 1
			println(maxID)
		}
		twClient := getTweetClient(ctx, s)
		tweets, _, err := twClient.Timelines.HomeTimeline(&twitter.HomeTimelineParams{
			Count:              200,
			SinceID:            sinceID,
			MaxID:              maxID,
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
}
