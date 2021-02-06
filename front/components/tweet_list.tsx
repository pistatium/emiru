import React from "react";
import {Tweet} from "../types/tweets";
import Images from "./images";

interface Props {
  tweets: Array<Tweet>
}

const TweetList: React.FC<Props> = ({children, tweets}) => {
  return <>
    {tweets?.filter(tw => !tw.text.startsWith('RT')).map(tw => (
        <div className="shadow bg-gray-100 my-4" key={tw.id}>
          <Images images={tw.images}/>
          <div className="relative">
            <img className="right-0 w-16 h-16 rounded-full mr-4 shadow-lg absolute -mt-8"
                 src={tw.author.icon} alt={tw.author.name}/>
          </div>

          <div className="p-4">
            <p className="text-gray-600 text-sm">{tw.text}</p>
            {tw.created_at}
            <div className="mt-4">
              <a href="#" className="no-underline mr-4 text-blue-500 hover:text-blue-400">{tw.url}</a>
            </div>
          </div>
        </div>
      )
    )}
  </>
}
export default TweetList
