import * as React from 'react'
import axios from 'axios'
import { GetTweetResponse, Tweet } from '../types/tweets'
import { useSWRInfinite } from 'swr'
import TweetList from './tweet_list'
import PullToRefresh from 'react-simple-pull-to-refresh'

interface Props {
    listID: string
    onlyFollowersRT: boolean
    filterSensitive: boolean
}

const fetcher = url => axios.get<GetTweetResponse>(url).then(res => res.data)

const getKey = (listId: string) => {
    return (pageIndex: number, previousPageData: GetTweetResponse): string => {
        const path = `/app/api/tweets?list_id=${listId}`
        // const path = '/dummy_data/tweets.json'
        if (pageIndex === 0) return path
        if (!previousPageData || !previousPageData.tweets) return null
        if (previousPageData.tweets.length == 0) return null
        const lastId = previousPageData.tweets.slice(-1)[0].id
        return `${path}&max_id=${lastId}`
    }
}

const filterTweet = (tweets: Array<Tweet>, onlyFollowersRT: boolean, filterSensitive: boolean): Array<Tweet> => {
    if (onlyFollowersRT) {
        tweets = tweets.filter(t => t.status.is_following)
    }
    if (filterSensitive) {
        tweets = tweets.filter(t => !t.is_sensitive)
    }
    return tweets
}

const Timeline: React.FC<Props> = ({ children, listID, onlyFollowersRT, filterSensitive }) => {
    const { data, error, size, setSize, mutate } = useSWRInfinite(getKey(listID), fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false })
    const responses = data
    let errorMsg = ''
    if (error) {
        if (error.response !== undefined && error.response.data.error) {
            if (error.response.data.error.includes('Rate limit exceeded')) {
                errorMsg = 'エラー: Twitter の API 制限がかかりました。15分後にお試しください。'
            } else {
                const errDetail = error.response.data.error
                if (errDetail.includes('unauthorized')) {
                    location.href = '/'
                    return
                }
                errorMsg = `エラー: エラーが発生しました。時間をおいてリトライしてください。${error.response.data.error}`
            }
        } else {
            errorMsg = `エラー: ${error}`
        }
    }
    if (!responses) {
        return (
            <PullToRefresh
                onRefresh={() => {
                    return mutate()
                }}
            >
                <div className="w-full block bg-white opacity-75 z-50 h-96">
                    <span className="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: '50%' }}>
                        <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                    </span>
                </div>
            </PullToRefresh>
        )
    }
    if (responses.length > 0 && responses.slice(-1)[0].tweets.length == 0) {
        errorMsg = 'これ以上データはありません。 ※ Twitter APIの制約により、これより古いツイートを遡れません。'
    }

    const tweets: Array<Tweet> = responses ? responses.flatMap(resp => resp.tweets) : []
    const filteredTweets = filterTweet(tweets, onlyFollowersRT, filterSensitive)
    return (
        <>
            <PullToRefresh
                onRefresh={() => {
                    return mutate()
                }}
            >
                <TweetList tweets={filteredTweets} />
            </PullToRefresh>

            {errorMsg != '' ? (
                <div className="my-6 font-medium py-4 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300">{errorMsg}</div>
            ) : null}
            <button
                onClick={() => setSize(size + 1)}
                className="group relative w-full flex justify-center my-2 py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                もっとみる
            </button>
        </>
    )
}
export default Timeline
