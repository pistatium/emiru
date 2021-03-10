import React from 'react'
import { Tweet } from '../types/tweets'
import axios from 'axios'
import TweetCard from './tweet'

interface Props {
    tweets: Array<Tweet>
}

const TweetList: React.FC<Props> = ({ children, tweets }) => {
    return (
        <>
            {tweets.map(tw => (
                <TweetCard key={tw.id} tweet={tw} />
            ))}
        </>
    )
}
export default TweetList
