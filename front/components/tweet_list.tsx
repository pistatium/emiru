import React from 'react'
import { Tweet } from '../types/tweets'
import Images from './images'
import dayjs from 'dayjs'
import axios from 'axios'

interface Props {
    tweets: Array<Tweet>
}

const setFavorite = targetID => axios.put(`/app/api/favorite`, { target_id: targetID }).then(res => res.data)

const TweetList: React.FC<Props> = ({ children, tweets }) => {
    const onClickFavorite = (targetID: string) => {
        setFavorite(targetID)
    }
    return (
        <>
            {tweets
                ?.filter(tw => tw.status.is_following)
                .map(tw => (
                    <div className="shadow bg-white my-2 space-y-2" key={tw.id}>
                        <Images images={tw.images} />

                        <div className="w-full px-4 flex">
                            <img className="w-8 h-8 rounded-full mr-4 shadow-lg overflow-hidden" src={tw.author.icon} alt={tw.author.name} />
                            <p className="flex-1 py-1 text-lg">{tw.author.name}</p>
                            <img src={'/images/logo-twitter.svg'} alt={'twitter'} className="float-right w-6 h-6 tweet_color" />
                        </div>

                        <div className="px-4 w-fulltext-gray-600 text-base text-gray-600">{tw.text}</div>
                        <div className="w-full flex content-end px-4 py-1">
                            <a href={tw.url} target="_blank" rel="noopener" className="align-text-bottom flex-1 text-blue-400 hover:text-blue-400">
                                <p className="text-leading">{dayjs(tw.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                            </a>
                            <img src="/images/retweet.svg" alt="retweet" className="h-8 mx-6 px-2 py-0.5 flex-1 tweet_color rounded" />
                            <img
                                src="/images/favourite.svg"
                                onClick={() => onClickFavorite(tw.target_id)}
                                alt="favorite"
                                className="h-8 px-2 py-0.5 flex-1 tweet_color rounded"
                            />
                        </div>
                    </div>
                ))}
        </>
    )
}
export default TweetList
