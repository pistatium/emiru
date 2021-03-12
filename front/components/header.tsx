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
                <title>{title}</title>npm install -D eslint prettier eslint-plugin-react
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
            <div className="lg:flex lg:items-center lg:justify-between bg-gray-800 fixed w-full h-12 z-50">
                <div className="flex-1 min-w-0 py-2 px-2">
                    <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:truncate">emiru</h2>
                </div>
            </div>
            <div className="h-12" />
            {showMenuDialog ? <div className="sm:hidden fixed bg-white w-full">{menu}</div> : null}
        </>
    )
}

export default Header
