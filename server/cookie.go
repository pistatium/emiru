package main

import (
	"fmt"
	"net/http"
	"regexp"
	"time"
)

const SessionCookieName = "EMIRU_SESSION"

var tokenPattern = regexp.MustCompile(`(?P<provider>\w):(?P<userid>\w)-(?P<secret>\w)`)

type TokenInfo struct {
	Provider string
	UserID string
	Secret string
}

func (t *TokenInfo) Serialize() string {
	return fmt.Sprintf("%s:%s-%s", t.Provider, t.UserID, t.Secret)
}

func NewFromToken(ts string) (TokenInfo, error) {
	m := tokenPattern.FindStringSubmatch(ts)
	ti := TokenInfo{}
	for i, name := range tokenPattern.SubexpNames() {
		switch name {
		case "provider": ti.Provider = m[i]
		case "userid": ti.UserID = m[i]
		case "secret": ti.Secret = m[i]
		default: continue
		}
	}
	return ti, nil
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
