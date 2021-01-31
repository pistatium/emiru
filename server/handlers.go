package main

import (
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/repositories"
	"net/http"
)

type Server struct {
	userStore repositories.UserStore
}

func (s *Server) GetCurrentUser(ctx *gin.Context) {
	sess, err := ctx.Cookie(SessionCookieName)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	ti, err := NewFromToken(sess)
	s.userStore.LoadFromID(ti.UserID)
}
