import React from "react";
import {Tweet} from "../types/tweets";
import Images from "./images";

interface Props {
  tweets: Array<Tweet>
}

const TweetList: React.FC<Props> = ({children, tweets}) => {
  return <>
    {tweets?.filter(tw => !tw.text.startsWith('RT')).map(tw => (
        <div className="shadow bg-white my-1" key={tw.id}>
          <Images images={tw.images}/>

          <div className="w-full p-4 flex">
            <img className="w-8 h-8 rounded-full mr-4 shadow-lg overflow-hidden"
                 src={tw.author.icon} alt={tw.author.name}/>
            <p className="flex-1 py-1 text-lg">{tw.author.name}</p>
            <img src={'/images/logo-twitter.svg'} alt={'twitter'}
                 className="float-right w-6 h-6 tweet_color"/>
          </div>
          <div className="p-4">
            <div className="text-gray-600 text-sm">
              {tw.text}
            </div>
            <a href={tw.url} target="_blank" rel="noopener" className="display-block text-blue-400 hover:text-blue-400">
              <p className="text-sm">{tw.created_at}</p>
            </a>
          </div>
        </div>
      )
    )}
  </>
}
export default TweetList
