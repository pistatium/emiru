import Header from '../components/header'
import axios from "axios"
import useSWR from "swr"
import {Tweet} from "../types/tweets";
import Footer from "../components/footer";
import React from "react";
import TweetList from "../components/tweet_list";

//const fetcher = () => axios('/app/api/tweets').then(res => res.data)
const fetcher = () => axios('/dummy_data/tweets.json').then(res => res.data)


export default function Main(props) {
  const {data, error} = useSWR('/api/tweets', fetcher, {revalidateOnFocus: false, revalidateOnReconnect: false})
  if (error || !data) {
    return <></>
  }
  const tweets: Array<Tweet> = data.tweets
  return (
    <div className="">
      <Header
        title={'emiru - mainフィード'}
        image={''}
        url={''}
      />

      <div className="xl:container xl:mx-auto">
        <div className=" flex flex-col sm:flex-row xl:my-24">
          <div className="flex-auto flex w-full flex-col">

            <TweetList tweets={tweets}/>

          </div>

          <div className="flex w-auto sm:w-1/2 md:w-1/2 spx-auto">
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
