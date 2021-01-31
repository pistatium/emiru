package repositories

import (
	"context"
	"crypto/rand"
	"fmt"
	"github.com/pistatium/emiru/entities"
)

func NewUser(id int64, name string, twitterAccessKey string, twitterAccessSecret string) *entities.User {
	return &entities.User{
		ID:                  idFromTwitter(id),
		Secret:              generateSecureSecret(32),
		Name:                name,
		TwitterAccessKey:    twitterAccessKey,
		TwitterAccessSecret: twitterAccessSecret,
	}
}

func idFromTwitter(id int64) string {
	return fmt.Sprintf("twitter:%d", id)
}

func generateSecureSecret(length int) string {
	k := make([]byte, length)
	if _, err := rand.Read(k); err != nil {
		panic(err)
	}
	return fmt.Sprintf("%x", k)
}

type UserStore interface {
	Save(ctx context.Context, user *entities.User) error
	LoadFromID(ctx context.Context, id string) (user *entities.User, err error)
}
