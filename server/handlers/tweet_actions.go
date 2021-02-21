package handlers

import (
	"github.com/dghubble/go-twitter/twitter"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/repositories"
	"net/http"
	"strconv"
)

func SetFavorite(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		targetID, _ := strconv.ParseInt(ctx.Param("target_id"), 10, 64)
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Favorites.Create(&twitter.FavoriteCreateParams{
			ID: targetID,
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
		targetID, _ := strconv.ParseInt(ctx.Param("target_id"), 10, 64)
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Favorites.Destroy(&twitter.FavoriteDestroyParams{
			ID: targetID,
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
		targetID, _ := strconv.ParseInt(ctx.Param("target_id"), 10, 64)
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Statuses.Retweet(targetID, &twitter.StatusRetweetParams{
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
		targetID, _ := strconv.ParseInt(ctx.Param("target_id"), 10, 64)
		twClient := getTweetClient(ctx, s)
		_, _, err := twClient.Statuses.Unretweet(targetID, &twitter.StatusUnretweetParams{
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
