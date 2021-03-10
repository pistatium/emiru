export interface TweetImage {
    url: string
}

export interface TweetStatus {
    retweeted_by: TweetUser
    is_following: boolean
    is_followed: boolean
    is_set_retweeted: boolean
    is_set_favorite: boolean
}

export interface TweetUser {
    name: string
    icon: string
}

export interface Tweet {
    id: string
    target_id: string
    url: string
    text: string
    images: Array<TweetImage>
    author: TweetUser
    created_at: string
    status: TweetStatus
    is_sensitive: boolean
}

export interface GetTweetResponse {
    tweets: Array<Tweet>
}
