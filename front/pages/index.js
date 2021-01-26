import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>

            <form className="max-w-md w-full" action="/app/login" method="GET">
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Sign in with Twitter
                    </button>
                </div>
            </form>
            <footer className={styles.footer}>
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
