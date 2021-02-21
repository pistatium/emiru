package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

type GetCurrentUserResponse struct {
	UserID    string `json:"user_id"`
	Name      string `json:"name"`
	Thumbnail string `json:"thumbnail"`
}

func GetCurrentUser(s *repositories.Server) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		user := ctx.MustGet(ContextUserKey).(*entities.User)
		ctx.JSON(http.StatusOK, &GetCurrentUserResponse{
			UserID: user.ID,
			Name:   user.Name,
		})
		return
	}
}
