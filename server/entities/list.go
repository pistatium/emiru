package entities

type List struct {
	ID string
	Name string
	Description string
	Creator *TweetUser
}
