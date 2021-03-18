package handlers

import (
	"fmt"
	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	"github.com/gin-gonic/gin"
	"github.com/pistatium/emiru/entities"
	"github.com/pistatium/emiru/repositories"
)

const ContextUserKey = "user"

func getTweetClient(ctx *gin.Context, s *repositories.Server) *twitter.Client {
	user := ctx.MustGet(ContextUserKey).(*entities.User)
	c := oauth1.NewConfig(s.TwitterClientKey, s.TwitterClientSecret)
	t := oauth1.NewToken(user.TwitterAccessKey, user.TwitterAccessSecret)
	httpClient := c.Client(ctx.Request.Context(), t)
	return twitter.NewClient(httpClient)
}

func parseTweet(tw *twitter.Tweet) *entities.Tweet {
	status := entities.TweetStatus{}
	statusID := tw.IDStr // RT 展開前のIDをのこす

	images := make([]*entities.Image, 0)

	if tw.ExtendedEntities != nil && len(tw.ExtendedEntities.Media) > 0 {
		for i, _ := range tw.ExtendedEntities.Media {
			media := tw.ExtendedEntities.Media[i]
			images = append(images, &entities.Image{
				Url: media.MediaURLHttps,
			})
		}
	}

	if tw.RetweetedStatus != nil {
		status.RetweetedBy = &entities.TweetUser{
			Name:    tw.User.ScreenName,
			Icon:    tw.User.ProfileImageURLHttps,
			Profile: tw.User.Description,
			Link: fmt.Sprintf("https://twitter.com/%s", tw.User.ScreenName),
		}
		tw = tw.RetweetedStatus
	}

	createdAt, err := tw.CreatedAtTime()
	if err != nil {
		return nil
	}
	status.IsFollowing = tw.User.Following
	status.IsSetFavorite = tw.Favorited
	status.IsSetRetweeted = tw.Retweeted

	return &entities.Tweet{
		ID:       statusID,
		TargetID: tw.IDStr,
		URL:      fmt.Sprintf("https://twitter.com/%s/status/%s", tw.User.ScreenName, tw.IDStr),
		Text:     tw.FullText,
		Author: &entities.TweetUser{
			Name:    tw.User.Name,
			Icon:    tw.User.ProfileImageURLHttps,
			Profile: tw.User.Description,
			Link: fmt.Sprintf("https://twitter.com/%s", tw.User.ScreenName),
		},
		Images:    images,
		CreatedAt: createdAt,
		Status:    &status,
		IsSensitive: tw.PossiblySensitive,
	}
}
