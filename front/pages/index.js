import Header from '../components/Header';

export default function Home() {
    return (
        <div className="md:container md:mx-auto">
            <Header
                title={'emiru - Topページ'}
                image={''}
                url={''}
            />

            <div className="relative bg-white overflow-hidden">
                <h1>emiru</h1>
            </div>

            <form className="max-w-md w-full" action="/app/login" method="GET">
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Sign in with Twitter
                    </button>
                </div>
            </form>
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
