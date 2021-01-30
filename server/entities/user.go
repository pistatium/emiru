package entities

type User struct {
	ID UniqueID
	Secret string
	Name string
	TwitterAccessKey string
	TwitterAccessSecret string
}

