package handlers

import (
	"github.com/dghubble/go-twitter/twitter"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

type GetListsResponse struct {
	Lists []*entities.List `json:"lists"`
}
func GetLists(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		twClient := getTweetClient(ctx, s)
		twLists, _, err := twClient.Lists.List(&twitter.ListsListParams{
			Reverse:    false,
		})

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		resLists := make([]*entities.List, 0)
		for i, _ := range twLists {
			list := parseList(&twLists[i])
			resLists = append(resLists, list)
		}
		ctx.JSON(http.StatusOK, GetListsResponse{
			Lists: resLists,
		})
		return

	}
}
