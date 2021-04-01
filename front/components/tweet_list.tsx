import React from 'react'
import { Tweet } from '../types/tweets'
import axios from 'axios'
import TweetCard from './tweet'
import Ad from './ad'

interface Props {
    tweets: Array<Tweet>
}

const TweetList: React.FC<Props> = ({ children, tweets }) => {
    return (
        <>
            {tweets.map((tw, i) => (
                <>
                    <TweetCard key={tw.id} tweet={tw} />
                    {i % 7 == 3 ? (
                        <div key={`ad-${i}`} className="my-4 mx-2">
                            <Ad />
                        </div>
                    ) : null}
                </>
            ))}
        </>
    )
}

export default TweetList
