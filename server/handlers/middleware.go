package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

func LoginMiddleware(s *repositories.Server) gin.HandlerFunc {
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
			user, err := s.UserStore.LoadFromID(ctx.Request.Context(), tokenInfo.UserID)
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
