import * as React from 'react'
import Head from 'next/head'
import { useState } from 'react'

interface Props {
    title: string
    image: string
    url: string
    description: string
    menu?: JSX.Element
}

const Header: React.FC<Props> = ({ children, title, image, url, menu, description }) => {
    const [showMenuDialog, setShowMenuDialog] = useState<boolean>(false)
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="og:site_name" content={title} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={image} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:description" content={description} />
                <link rel="canonical" href={url} />
                <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
                <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
                <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" />
                <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
                <meta name="msapplication-TileColor" content="#0078d7" />
                <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
                <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="36x36" href="/android-chrome-36x36.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/android-chrome-48x48.png" />
                <link rel="icon" type="image/png" sizes="72x72" href="/android-chrome-72x72.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/android-chrome-96x96.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="/android-chrome-128x128.png" />
                <link rel="icon" type="image/png" sizes="144x144" href="/android-chrome-144x144.png" />
                <link rel="icon" type="image/png" sizes="152x152" href="/android-chrome-152x152.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
                <link rel="icon" type="image/png" sizes="384x384" href="/android-chrome-384x384.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
                <link rel="icon" type="image/png" sizes="36x36" href="/icon-36x36.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
                <link rel="icon" type="image/png" sizes="72x72" href="/icon-72x72.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="/icon-128x128.png" />
                <link rel="icon" type="image/png" sizes="144x144" href="/icon-144x144.png" />
                <link rel="icon" type="image/png" sizes="152x152" href="/icon-152x152.png" />
                <link rel="icon" type="image/png" sizes="160x160" href="/icon-160x160.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="196x196" href="/icon-196x196.png" />
                <link rel="icon" type="image/png" sizes="256x256" href="/icon-256x256.png" />
                <link rel="icon" type="image/png" sizes="384x384" href="/icon-384x384.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
                <link rel="icon" type="image/png" sizes="24x24" href="/icon-24x24.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <div className="flex items-center justify-between bg-gray-800 fixed w-full h-12 z-50 px-4">
                <img src="/images/emiru_small.png" className="h-10" />
                <div className="flex-1 min-w-0 py-2">
                    <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:truncate">emiru (β)</h2>
                </div>
                <button className="md:hidden text-white font-bold" onClick={() => setShowMenuDialog(!showMenuDialog)}>
                    設定
                </button>
            </div>
            <div className="h-12" />
            {showMenuDialog ? (
                <div className="h-screen fixed z-50">
                    <div className="md:hidden fixed bg-gray-100 w-full p-4 h-screen">{menu}</div>
                </div>
            ) : null}
        </>
    )
}

export default Header
