package datastore

import (
	ds "cloud.google.com/go/datastore"
	"context"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
	"time"
)

type UserStore struct {
	projectID string
}

const DatastoreUserKind = "user"

type DatastoreUser struct {
	ID                  string     `datastore:"-"`
	Secret              string     `datastore:"secret,noindex"`
	Name                string     `datastore:"name"`
	TwitterAccessKey    string     `datastore:"access_key,noindex"`
	TwitterAccessSecret string     `datastore:"access_secret,noindex"`
	CreatedAt           *time.Time `datastore:"created_at"`
	UpdatedAt           *time.Time `datastore:"updated_at"`
	Thumbnail           string     `datastore:thumbnail,noindex`
}

func NewUserStore(projectID string) repositories.UserStore {
	return &UserStore{projectID: projectID}
}

func (u UserStore) Save(ctx context.Context, user *entities.User) error {
	client, err := u.getClient(ctx)
	if err != nil {
		return err
	}
	now := time.Now()
	du := &DatastoreUser{
		ID:                  string(user.ID),
		Secret:              user.Secret,
		Name:                user.Name,
		TwitterAccessKey:    user.TwitterAccessKey,
		TwitterAccessSecret: user.TwitterAccessSecret,
		CreatedAt:           &now, // FIXME: 上書きしない
		UpdatedAt:           &now,
		Thumbnail:           "",
	}
	key := ds.NameKey(DatastoreUserKind, du.ID, nil)
	if _, err := client.Put(ctx, key, du); err != nil {
		return err
	}
	return nil
}

func (u UserStore) LoadFromID(ctx context.Context, id string) (user *entities.User, err error) {
	client, err := u.getClient(ctx)
	if err != nil {
		return nil, err
	}
	key := ds.NameKey(DatastoreUserKind, id, nil)
	du := &DatastoreUser{}
	if err = client.Get(ctx, key, du); err != nil {
		return nil, err
	}
	user = &entities.User{
		ID:                  id,
		Secret:              du.Secret,
		Name:                du.Name,
		TwitterAccessKey:    du.TwitterAccessKey,
		TwitterAccessSecret: du.TwitterAccessSecret,
	}
	return user, nil
}

func (u UserStore) getClient(ctx context.Context) (client *ds.Client, err error) {
	client, err = ds.NewClient(ctx, u.projectID)
	return
}
