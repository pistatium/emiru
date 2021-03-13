import * as React from 'react'
import Head from 'next/head'
import { useState } from 'react'

interface Props {
    title: string
    image: string
    url: string
    menu: any
}

const Header: React.FC<Props> = ({ children, title, image, url, menu }) => {
    const [showMenuDialog, setShowMenuDialog] = useState<boolean>(true)
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta property="og:title" content={title} />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="og:site_name" content={title} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@tcr_jp" />
                <meta name="twitter:url" content={image} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:image" content={image} />
                <link rel="canonical" href={url} />
                <link rel="shortcut icon" href={'https://t-cr.jp/favicon.ico'} />
                <link rel="apple-touch-icon" href={'https://t-cr.jp/logo.png'} />
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
