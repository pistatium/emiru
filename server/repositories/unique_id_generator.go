package repositories

import "github.com/pistatium/emiru/entities"

type UniqueIDGenerator interface {
	Generate() entities.UniqueID
}
