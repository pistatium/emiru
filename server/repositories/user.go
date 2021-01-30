package repositories

import (
	"context"
	"crypto/rand"
	"fmt"
	"github.com/pistatium/emiru/entities"
)


func NewUser(idGenerator UniqueIDGenerator, name string, twitterAccessKey string, twitterAccessSecret string) *entities.User {
	return &entities.User {
		ID: idGenerator.Generate(),
		Secret: generateSecureSecret(32),
		Name: name,
		TwitterAccessKey: twitterAccessKey,
		TwitterAccessSecret: twitterAccessSecret,
	}
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
