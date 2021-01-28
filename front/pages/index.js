import Header from '../components/Header';

export default function Home() {
    return (
        <div className="">
            <Header
                title={'emiru - Topページ'}
                image={''}
                url={''}
            />
            <div class="lg:flex lg:items-center lg:justify-between bg-gray-800">
                <div class="flex-1 min-w-0 py-2 px-2">
                    <h2 class="text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:truncate">
                        emiru
                    </h2>
                </div>
            </div>
            <div class="xl:container xl:mx-auto">
                <div className=" flex flex-col sm:flex-row my-12 bg-gray-400">
                    <div className="flex-auto flex w-full flex-col  bg-gray-100 text-gray-600">
                        <div className="pt-12 pb-24 px-6">
                            <p className="w-full items-start">
                                <div className="max-w-sm text-6xl leading-snug font-black break-words">
                                    <span className="text-blue-500">絵師のための</span>タイムライン 閲覧アプリ
                                </div>
                            </p>
                            <h1 className="my-4"></h1>
                            <p className="leading-normal mb-4">ああああああああああああああ<br/>あああああああああああ<br/>あああああああああああ<br/>ああああああああああああああ
                            </p>
                            <form action="/app/login" method="GET">
                                <button
                                    className="group relative w-full flex justify-center py-2 px-2 border border-transparent text-medium font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Twitter でログインして開始
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="flex w-auto sm:w-1/3 spx-auto">
                        <img src={"/images/crayon.jpg"} className="object-cover"/>
                    </div>

                </div>
                <div>
                    ツイッターと「連携アプリを認証」することで、あなたのタイムラインの情報を取得します。
                    また、アプリ内から「いいね」や「リツイート」をできるようにするため送信機能を利用しています。
                    連携することによって勝手にツイートされるといったことはありません。
                </div>
            </div>
            <footer className="footer">
                <a
                    href="https://github.com/pistatium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ©2021 pistatium
                </a>

            </footer>
        </div>
    )
}
