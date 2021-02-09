export interface TweetImage {
  url: string
}

export interface TweetUser {
  name: string
  icon: string
}

export interface Tweet {
  id: string
  url: string
  text: string
  images: Array<TweetImage>
  author: TweetUser
  created_at: string
  is_retweet: boolean
}
