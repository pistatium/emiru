package snowflake

import (
	"github.com/bwmarrin/snowflake"
	"github.com/pistatium/emiru/entities"
)

type UniqueIDGenerator struct {
	node *snowflake.Node
}

func (u UniqueIDGenerator) Generate() entities.UniqueID {
	return entities.UniqueID(u.node.Generate().Base58())
}

func New(serverID int64) (*UniqueIDGenerator, error) {
	node, err := snowflake.NewNode(serverID)
	if err != nil {
		return nil, err
	}
	gen := UniqueIDGenerator{
		node: node,
	}
	return &gen, nil
}
