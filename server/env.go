package main

type Env struct {
	TwitterConsumerKey string `required:"true" envconfig:"TWITTER_CONSUMER_KEY"`
	TwitterConsumerSecret string `required:"true" envconfig:"TWITTER_CONSUMER_SECRET"`
}
