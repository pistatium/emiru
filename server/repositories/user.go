package repositories

import "github.com/pistatium/emiru/entities"


func NewUser(idGenerator UniqueIDGenerator, name string, twitterAccessKey string, twitterAccessSecret string) *entities.User {
	return &entities.User {
		ID: idGenerator.Generate(),
		Name: name,
		TwitterAccessKey: twitterAccessKey,
		TwitterAccessSecret: twitterAccessSecret,
	}
}
