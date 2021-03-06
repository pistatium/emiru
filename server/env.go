package main

type Env struct {
	TwitterConsumerKey string `required:"true" envconfig:"TWITTER_CONSUMER_KEY"`
	TwitterConsumerSecret string `required:"true" envconfig:"TWITTER_CONSUMER_SECRET"`
	Port string `default:"8080" envconfig:"PORT"`
	AppURL string `required:"true" envconfig:"APP_URL"`
	DatastoreProjectID string `required:"true" envconfig:"DATASTORE_PROJECT_ID"`
	IsDebug bool `default:"true" envconfig:"IS_DEBUG"`
	StaticDir string `envconfig:"STATIC_DIR"`
}
