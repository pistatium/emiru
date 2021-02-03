package entities

import "time"

type Image struct {
	Url string `json:"url"`
}

type TweetUser struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
	Profile string `json:"profile"`
}

type Tweet struct {
	ID string `json:"id"`
	Text string `json:"text"`
	Author *TweetUser `json:"author"`
	Images []*Image `json:"images"`
	CreatedAt time.Time `json:"created_at"`
}
