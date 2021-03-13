import React from 'react'
import { Tweet } from '../types/tweets'
import Images from './images'
import dayjs from 'dayjs'
import axios from 'axios'

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
        <div className="shadow bg-white my-2 space-y-2">
            <Images images={tweet.images} />

            <div className="w-full px-4 flex">
                <img className="w-8 h-8 rounded-full mr-4 shadow-lg overflow-hidden" src={tweet.author.icon} alt={tweet.author.name} />
                <p className="flex-1 py-1 text-lg">{tweet.author.name}</p>
                <img src={'/images/logo-twitter.svg'} alt={'twitter'} className="float-right w-6 h-6 tweet_color" />
            </div>

            <div className="px-4 w-fulltext-gray-600 text-base text-gray-600">{tweet.text}</div>
            <div className="w-full flex content-end px-4 py-1">
                <a href={tweet.url} target="_blank" rel="noopener" className="align-text-bottom flex-1 text-blue-400 hover:text-blue-400">
                    <p className="text-leading">{dayjs(tweet.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                </a>
                <button onClick={onClickRetweet} className="h-12 mx-6 px-2 py-0.5 cursor-pointer">
                    <img src="/images/retweet.svg" alt="retweet" className={`mx-auto p-1 rounded-full ${isRetweeted ? 'bg-blue-200' : 'normal'}`} />
                </button>
                <button onClick={onClickFavorite} className="h-12 mx-6 px-2 py-0.5 cursor-pointer">
                    <img src="/images/favourite.svg" alt="favorite" className={`mx-auto p-1 rounded-md ${isFavorite ? 'bg-blue-200 ' : 'normal'}`} />
                </button>
            </div>
        </div>
    )
}
export default TweetCard
