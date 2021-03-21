import { TweetUser } from './tweets'

export interface List {
    id: string
    name: string
    description: string
    creator: TweetUser
}

export interface GetListResponse {
    lists: Array<List>
}
