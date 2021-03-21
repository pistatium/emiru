package entities

type List struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Creator *TweetUser `json:"creator"`
}
