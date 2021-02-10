export interface TweetImage {
    url: string
}

export interface TweetStatus {
    retweeted_by: TweetUser
    is_following: boolean
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
    status: TweetStatus
}
