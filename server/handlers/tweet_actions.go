package handlers

import (
	"fmt"
	"github.com/dghubble/go-twitter/twitter"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

type TweetRequest struct {
	TargetID int64 `json:"target_id,string"`
}

func SetFavorite(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		var json TweetRequest

		if err := ctx.ShouldBindJSON(&json); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		fmt.Println(json)
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Favorites.Create(&twitter.FavoriteCreateParams{
			ID: json.TargetID,
		})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
		return
	}
}

func UnsetFavorite(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		var json TweetRequest
		if err := ctx.ShouldBindJSON(&json); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Favorites.Destroy(&twitter.FavoriteDestroyParams{
			ID: json.TargetID,
		})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
		return
	}
}

func SetRetweet(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		var json TweetRequest
		if err := ctx.ShouldBindJSON(&json); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Statuses.Retweet(json.TargetID, &twitter.StatusRetweetParams{
			ID:       0,
			TrimUser: twitter.Bool(true),
		})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
		return
	}
}
func UnSetRetweet(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		var json TweetRequest
		if err := ctx.ShouldBindJSON(&json); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Statuses.Unretweet(json.TargetID, &twitter.StatusUnretweetParams{
			ID:       0,
			TrimUser: twitter.Bool(true),
		})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
		return
	}
}
