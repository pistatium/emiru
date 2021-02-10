package entities

import "time"

type Image struct {
	Url string `json:"url"`
}

type TweetStatus struct {
	RetweetedBy *TweetUser `json:"retweeted_by"`
	IsFollowing bool `json:"is_following"`
}

type TweetUser struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
	Profile string `json:"profile"`
}

type Tweet struct {
	ID string `json:"id"`
	URL string `json:"url"`
	Text string `json:"text"`
	Author *TweetUser `json:"author"`
	Images []*Image `json:"images"`
	CreatedAt time.Time `json:"created_at"`
	Status *TweetStatus `json:"status"`
}
