package main

import (
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

type Server struct {
	userStore repositories.UserStore
}

func NewServer(userStore repositories.UserStore) *Server {
	return &Server{
		userStore: userStore,
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
