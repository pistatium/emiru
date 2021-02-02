import Header from '../components/Header'
import axios from "axios"
import useSWR from "swr"

const fetcher = () => axios('/app/api/tweets').then(res => res.data)


export default function Main(props) {
    const { data, error } = useSWR('/api/tweets', fetcher, {revalidateOnFocus: false, revalidateOnReconnect: false})
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

            { data?.map(tw => (
                <div className="shadow bg-white">
                    <div className=" bg-size bg-cover bg-center">
                        <img src={tw.Images[0].Url} alt=""/>
                        <div className="p-4 h-32 flex items-end text-white">
                            <h3 className="mb-2">Card Title</h3>
                        </div>

                        <div className="relative">
                            <button
                                className="bg-blue-500 hover:bg-blue-400 absolute right- mr-4 -mt-8 flex justify-center items-center rounded-full h-12 w-12 p-2">
                                <i className="material-icons text-white">add_to_queue</i></button>
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-600 text-sm">{tw.Text}</p>
                        <div className="mt-4">
                            <a href="#" className="no-underline mr-4 text-blue-500 hover:text-blue-400">Link 1</a>
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
