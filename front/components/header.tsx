import * as React from 'react'
import Head from 'next/head'
import { useState } from 'react'

interface Props {
    title: string
    image: string
    url: string
    description?: string
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
                <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/images/favicon.ico" />
                <link rel="icon" type="image/vnd.microsoft.icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/images/android-chrome-512x512.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="/images/icon-128x128.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/images/icon-512x512.png" />
                <link rel="manifest" href="/images/manifest.json" />
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
