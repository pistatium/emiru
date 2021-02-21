package repositories


type Server struct {
	UserStore           UserStore
	TwitterClientKey    string
	TwitterClientSecret string
	SessionCookieName   string
}

func NewServer(userStore UserStore, twitterClientKey string, twitterClientSecret string) *Server {
	return &Server{
		UserStore:           userStore,
		TwitterClientKey:    twitterClientKey,
		TwitterClientSecret: twitterClientSecret,
	}
}
