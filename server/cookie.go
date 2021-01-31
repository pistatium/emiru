package main

import (
	"fmt"
	"github.com/pistatium/emiru/entities"
	"net/http"
	"time"
)

const SessionCookieName = "EMIRU_SESSION"


func generateSessionCookie(u *entities.User, secure bool) *http.Cookie {
	return &http.Cookie{
		Name: SessionCookieName,
		Value: fmt.Sprintf("%s-%s", u.ID, u.Secret),
		Secure: secure,
		HttpOnly: true,
		Path: "/",
		Expires: time.Now().Add(7 * 24 * time.Hour),
	}
}
