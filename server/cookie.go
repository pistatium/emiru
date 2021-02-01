package main

import (
	"fmt"
	"net/http"
	"strings"
	"time"
)

const SessionCookieName = "EMIRU_SESSION"


type TokenInfo struct {
	UserID string
	Secret string
}

func (t *TokenInfo) Serialize() string {
	return fmt.Sprintf("%s-%s", t.UserID, t.Secret)
}

func NewFromToken(token string) (*TokenInfo, error) {
	ts := strings.Split(token, "-")
	if len(ts) != 2 {
		return nil, fmt.Errorf("invalid token format")
	}
	return &TokenInfo{
		UserID: ts[0],
		Secret: ts[1],
	}, nil
}

func generateSessionCookie(t *TokenInfo, secure bool) *http.Cookie {
	return &http.Cookie{
		Name: SessionCookieName,
		Value: t.Serialize(),
		Secure: secure,
		HttpOnly: true,
		Path: "/",
		Expires: time.Now().Add(7 * 24 * time.Hour),
	}
}
