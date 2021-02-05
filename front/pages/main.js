import Header from '../components/Header'
import axios from "axios"
import useSWR from "swr"
import Images from "../components/Images";

const fetcher = () => axios('/app/api/tweets').then(res => res.data.tweets)
//const fetcher = () => axios('/dummy_data/tweets.json').then(res => res.data.tweets)


export default function Main(props) {
    const {data, error} = useSWR('/api/tweets', fetcher, {revalidateOnFocus: false, revalidateOnReconnect: false})
    return (
        <div className="">
            <Header
                title={'emiru'}
                image={''}
                url={''}
            />
            <div className="lg:flex lg:items-center lg:justify-between bg-gray-800">
                <div className="flex-1 min-w-0 py-2 px-2">
                    <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:truncate">
                        emiru
                    </h2>
                </div>
            </div>


            {data?.filter(tw => !tw.text.startsWith('RT')).map(tw => (
                <div className="shadow bg-gray-100 my-4 ">
                    <Images images={tw.images}></Images>
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
            ))}
            <footer className="py-16 px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-auto lg:mr-auto text-center lg:text-left">©2021 pistatium</div>
                    <div className="flex justify-center items-center space-x-6 mt-4 lg:mt-0">
                        <a href="https://twitter.com/kimihiro_n" target="_blank" rel="noopener">
                            <img src={'/images/logo-twitter.svg'} alt={'twitter'}
                                 className="text-indigo-600 w-6 h-6"/>
                        </a>
                        <a href="https://github.com/pistatium" target="_blank" rel="noopener">
                            <img src={'/images/logo-github.svg'} alt={'GitHub'}
                                 className="text-indigo-600 w-6 h-6"/>
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    )
}
