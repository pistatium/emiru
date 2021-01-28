import Header from '../components/Header';

export default function Home() {
    return (
        <div className="md:container md:mx-auto">
            <Header
                title={'emiru - Topページ'}
                image={''}
                url={''}
            />

            <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24 bg-gray-200">
                <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
                    <p className="text-5xl tracking-loose">emiru</p>
                    <h1 className="my-4">絵師のためのTwitterビューアー</h1>
                    <p className="leading-normal mb-4">てすと</p>
                    <form action="/app/login" method="GET">
                        <button
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-medium font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Twitter でログインして今すぐ始める
                        </button>
                    </form>
                </div>

                <div className="w-full lg:w-1/2 lg:py-6 text-center px-24 my-12">
                    <img src={"/images/emiru.png"} />
                </div>
            </div>
            <div>
                ツイッターと「連携アプリを認証」することで、あなたのタイムラインの情報を取得します。
                また、アプリ内から「いいね」や「リツイート」をできるようにするため送信機能を利用しています。
                連携することによって勝手にツイートされるといったことはありません。
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
