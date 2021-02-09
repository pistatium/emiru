import React from 'react'
import { Tweet } from '../types/tweets'
import Images from './images'
import dayjs from 'dayjs'

interface Props {
    tweets: Array<Tweet>
}

const TweetList: React.FC<Props> = ({ children, tweets }) => {
    return (
        <>
            {tweets
                ?.filter(tw => !tw.text.startsWith('RT'))
                .filter(tw => !tw.is_retweet)
                .map(tw => (
                    <div className="shadow bg-white my-2" key={tw.id}>
                        <Images images={tw.images} />

                        <div className="w-full p-2 flex">
                            <img className="w-8 h-8 rounded-full mr-4 shadow-lg overflow-hidden" src={tw.author.icon} alt={tw.author.name} />
                            <p className="flex-1 py-1 text-lg">{tw.author.name}</p>
                            <img src={'/images/logo-twitter.svg'} alt={'twitter'} className="float-right w-6 h-6 tweet_color" />
                        </div>

                        <div className="p-2 w-fulltext-gray-600 text-sm">{tw.text}</div>
                        <div className="w-full flex flex-row-reverse p-2">
                            <a href={tw.url} target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-400">
                                <p className="text-sm">{dayjs(tw.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                            </a>
                        </div>
                    </div>
                ))}
        </>
    )
}
export default TweetList
