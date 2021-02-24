import React from 'react'
import { Tweet } from '../types/tweets'
import axios from 'axios'
import TweetCard from './tweet'

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
                    <TweetCard key={tw.id} tweet={tw} />
                ))}
        </>
    )
}
export default TweetList
