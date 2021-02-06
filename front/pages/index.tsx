import Header from '../components/header';
import React from 'react'
import Footer from "../components/footer";

const Home: React.FC = () => {
    return (
        <div className="">
            <Header
                title={'emiru - Topページ'}
                image={''}
                url={''}
            />

            <div className="xl:container xl:mx-auto">
                <div className=" flex flex-col sm:flex-row xl:my-24 bg-gray-400">
                    <div className="flex-auto flex w-full flex-col  bg-gray-100 text-gray-600">
                        <div className="pt-12 pb-24 px-12">
                            <p className="w-full items-start">
                                <div className="max-w-sm text-6xl leading-snug font-black break-words">
                                    <span className="text-blue-500">絵師のための</span>タイムライン 閲覧アプリ
                                </div>
                            </p>

                            <p className="leading-normal my-2 mb-4 leading-loose break-words">
                                emiru(エミル) は絵師さん向けの Twitter 表示 Web アプリケーションです。
                                通常の Twitter より効率よくイラスト付きツイートを巡回することができます。
                                利用は無料です。
                            </p>
                            <form action="/app/login" method="GET" className="py-2">
                                <button
                                    className="w-full inline-block py-4 px-8 leading-none text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded shadow">
                                    Twitter でログインして開始
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="flex w-auto sm:w-1/3 md:w-1/2 spx-auto">
                        <img src={"/images/crayon.jpg"} className="object-cover"/>
                    </div>
                </div>

                <section className="p-4 text-gray-600">
                    <div className="flex flex-wrap text-center">
                        <div className="md:w-1/2 py-4 md:px-10 mb-4 md:mb-0">
                            <img src={'/images/list-outline.svg'} alt={'list'}
                                 className="text-indigo-600 w-12 h-12 mx-auto mb-3"/>
                            <h3 className="text-2xl mb-3 font-semibold font-heading">絵だけが見られるタイムライン</h3>
                            <p className="text-gray-400 leading-relaxed">
                                画像付きツイートのみに絞ってあなたのタイムラインを表示できます。
                                フォロー中の絵師さんの絵を漏らさず見れるので巡回がはかどります。
                            </p>
                        </div>
                        <div className="md:w-1/2 py-4 md:px-10 mb-4 md:mb-0 md:border-l">
                            <img src={'/images/people-outline.svg'} alt={'friends'}
                                 className="text-indigo-600 w-12 h-12 mx-auto mb-3"/>
                            <h3 className="text-2xl mb-3 font-semibold font-heading">相互フォローフィルタ</h3>
                            <p className="text-gray-400 leading-relaxed">
                                相互フォローのユーザーに限定してタイムラインを表示することもできます。
                                いいねやRTもアプリ内から直接おこなえます。
                            </p>
                        </div>
                    </div>
                </section>
                <section className="mx-8 py-8 px-4 bg-gray-100 rounded text-gray-600">
                    <div className="flex flex-wrap -mx-2">
                        <div className="lg:w-2/5 px-2 lg:pr-16 mb-6 lg:mb-0">
                            <h2 className="text-3xl font-semibold">Twitter 連携について</h2>
                        </div>
                        <div className="lg:w-3/5 px-2">
                            <p>
                                ツイッターと「連携アプリを認証」することで、あなたのタイムラインの情報を取得します。
                                また、アプリ内から「いいね」や「リツイート」をできるようにするため送信機能を利用しています。
                                連携することによって勝手にツイートされるといったことはありません。
                            </p>
                            <p className="py-2 font-bold underline">
                                <a href="/privacy_policy.html">プライバシーポリシー</a>
                            </p>
                        </div>
                    </div>
                </section>


                <section className="py-16 px-4 text-center">
                    <a className="inline-block py-4 px-8 leading-none text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded shadow" href="/app/login">
                        Twitter でログインして開始
                    </a>
                </section>

                <Footer/>
            </div>

        </div>
    )
}

export default Home