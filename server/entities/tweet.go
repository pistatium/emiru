package entities

import "time"

type Image struct {
	Url string
}

type TweetUser struct {
	Name string
	Icon string
	Profile string
}

type Tweet struct {
	ID string
	Text string
	Author *TweetUser
	Images []*Image
	CreatedAt time.Time
}
