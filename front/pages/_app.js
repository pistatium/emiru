import '../styles/globals.css'
import Router from 'next/router'
import withGA from 'next-ga'

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default withGA('UA-193136339-1', Router)(MyApp)
