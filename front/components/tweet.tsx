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
                    <div className="flex-1 truncate">
                        <a href={tweet.status.retweeted_by.link} target="_blank" rel="noreferrer">
                            {tweet.status.retweeted_by.name}
                        </a>
                        さんが RTしました
                    </div>
                    <span className="text-blue-200">{dayjs(tweet.status.retweeted_at).fromNow()}</span>
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

            <div className="w-full flex py-2">
                <button onClick={onClickRetweet} className="flex-1 cursor-pointer">
                    <svg
                        className={`h-8 w-8 mx-auto p-1 rounded-md block opactext-center ${
                            isRetweeted ? 'fill-current stroke-2 text-white bg-green-400' : 'stroke-current text-gray-200 opacity-30'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" />
                    </svg>
                </button>
                <button onClick={onClickFavorite} className="flex-1 cursor-pointer ">
                    <svg
                        className={`h-8 w-8 mx-auto p-1 rounded-md block opactext-center ${
                            isFavorite ? 'fill-current stroke-2 text-white bg-red-400' : 'stroke-current text-gray-200 opacity-30'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default TweetCard
