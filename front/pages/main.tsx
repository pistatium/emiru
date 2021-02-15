import Header from '../components/header'
import axios from 'axios'
import { Tweet } from '../types/tweets'
import Footer from '../components/footer'
import React from 'react'
import TweetList from '../components/tweet_list'
import { useSWRInfinite } from 'swr'

//const fetcher = () => axios('/app/api/tweets').then(res => res.data)
const fetcher = url => axios(url).then(res => res.data)

const getKey = (pageIndex, previousPageData): string => {
    //const path = '/app/api/tweets'
    const path = '/dummy_data/tweets.json'
    if (previousPageData && !previousPageData.tweets) return null
    if (pageIndex === 0) return path
    const lastId = previousPageData.tweets.slice(-1)[0].id
    return `${path}?max_id=${lastId}`
}

export default function Main(props) {
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false })
    console.log(data)
    if (!data) {
        return <></>
    }

    const tweets: Array<Tweet> = data.flatMap(data => data.tweets)
    return (
        <div className="bg-gray-100">
            <Header title={'emiru - mainフィード'} image={''} url={''} />

            <div className="lg:container xl:mx-auto xl:px-24">
                <div className="flex md:flex-row">
                    <div className="flex-auto flex flex-col xl:px-6">
                        <TweetList tweets={tweets} />

                        <button
                            onClick={() => setSize(size + 1)}
                            className="group relative w-full flex justify-center my-2 py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            もっとみる
                        </button>
                    </div>

                    <div className="flex w-auto hidden lg:block lg:w-2/3 spx-auto">
                        <div className="flex flex-col bg-white px-6 py-4 mx-auto rounded-lg shadow-md">
                            <div className="">
                                <div>設定</div>
                                <ul className="-mx-4">
                                    <li className="flex items-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                                            alt="avatar"
                                            className="w-10 h-10 object-cover rounded-full mx-4"
                                        />
                                        <p>
                                            <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">
                                                Alex John
                                            </a>
                                            <span className="text-gray-700 text-sm font-light">Created 23 Posts</span>
                                        </p>
                                    </li>
                                    <li className="flex items-center mt-6">
                                        <img
                                            src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"
                                            alt="avatar"
                                            className="w-10 h-10 object-cover rounded-full mx-4"
                                        />
                                        <p>
                                            <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">
                                                Jane Doe
                                            </a>
                                            <span className="text-gray-700 text-sm font-light">Created 52 Posts</span>
                                        </p>
                                    </li>
                                    <li className="flex items-center mt-6">
                                        <img
                                            src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                                            alt="avatar"
                                            className="w-10 h-10 object-cover rounded-full mx-4"
                                        />
                                        <p>
                                            <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">
                                                Lisa Way
                                            </a>
                                            <span className="text-gray-700 text-sm font-light">Created 73 Posts</span>
                                        </p>
                                    </li>
                                    <li className="flex items-center mt-6">
                                        <img
                                            src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                                            alt="avatar"
                                            className="w-10 h-10 object-cover rounded-full mx-4"
                                        />
                                        <p>
                                            <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">
                                                Steve Matt
                                            </a>
                                            <span className="text-gray-700 text-sm font-light">Created 245 Posts</span>
                                        </p>
                                    </li>
                                    <li className="flex items-center mt-6">
                                        <img
                                            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=373&amp;q=80"
                                            alt="avatar"
                                            className="w-10 h-10 object-cover rounded-full mx-4"
                                        />
                                        <p>
                                            <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">
                                                Khatab Wedaa
                                            </a>
                                            <span className="text-gray-700 text-sm font-light">Created 332 Posts</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
