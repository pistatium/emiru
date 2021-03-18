import React from 'react'
import { Tweet } from '../types/tweets'
import Images from './images'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import axios from 'axios'

dayjs.extend(relativeTime)

interface Props {
    tweet: Tweet
}

const setFavorite = targetID => axios.put(`/app/api/favorite`, { target_id: targetID }).then(res => res.data)
const setRetweet = targetID => axios.put(`/app/api/retweet`, { target_id: targetID }).then(res => res.data)

const TweetCard: React.FC<Props> = ({ children, tweet }) => {
    const [isFavorite, setIsFavorite] = React.useState(tweet.status.is_set_favorite)
    const [isRetweeted, setIsRetweeted] = React.useState(tweet.status.is_set_retweeted)
    const onClickFavorite = () => {
        setIsFavorite(true)
        setFavorite(tweet.target_id)
    }
    const onClickRetweet = () => {
        setIsRetweeted(true)
        setRetweet(tweet.target_id)
    }
    return (
        <div className="shadow bg-white my-2">
            <Images images={tweet.images} />

            {tweet.status.retweeted_by ? (
                <div className="bg-blue-500 text-white mt-0 px-4 flex  py-1">
                    <a href={tweet.status.retweeted_by.link} target="_blank" rel="noreferrer">
                        <img className="w-6 h-6 rounded-full mr-4" src={tweet.status.retweeted_by.icon} alt={tweet.status.retweeted_by.name} />
                    </a>
                    <a href={tweet.status.retweeted_by.link} target="_blank" rel="noreferrer">
                        {tweet.status.retweeted_by.name}
                    </a>
                    さんが RTしました
                </div>
            ) : null}

            <div className="w-full px-4 flex mt-2">
                <a href={tweet.author.link} className="w-8 h-8 mr-4" target="_blank" rel="noreferrer">
                    <img className="w-8 h-8 rounded-full overflow-hidden" src={tweet.author.icon} alt={tweet.author.name} />
                </a>
                <a href={tweet.author.link} className="flex-1 inline-block" target="_blank" rel="noreferrer">
                    <p className="text-lg truncate">{tweet.author.name}</p>
                </a>

                <img src="/images/logo-twitter.svg" alt="twitter" className="ml-2 mt-1 w-6 h-6 tweet_color" />
            </div>

            <div className="px-4 w-fulltext-gray-600 text-sm mt-2 text-gray-600">{tweet.text}</div>

            <a href={tweet.url} target="_blank" rel="noreferrer" className="px-4 inline-block text-blue-400 hover:text-blue-400">
                <p className="text-leading">{dayjs(tweet.created_at).fromNow()}</p>
            </a>

            <div className="w-full flex content-end px-4 py-1">
                <button onClick={onClickRetweet} className="flex-1 h-12 cursor-pointer">
                    <img src="/images/retweet.svg" alt="retweet" className={`mx-auto p-1 rounded-full ${isRetweeted ? 'bg-blue-200' : 'normal'}`} />
                </button>
                <button onClick={onClickFavorite} className="flex-1 h-12 cursor-pointer">
                    <img src="/images/favourite.svg" alt="favorite" className={`mx-auto p-1 rounded-md ${isFavorite ? 'bg-blue-200 ' : 'normal'}`} />
                </button>
            </div>
        </div>
    )
}
export default TweetCard
