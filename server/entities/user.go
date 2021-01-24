package entities

type User struct {
	ID UniqueID
	Name string
	TwitterAccessKey string
	TwitterAccessSecret string
}

