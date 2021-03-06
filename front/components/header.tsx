import * as React from 'react'
import Head from 'next/head'
import { useState } from 'react'

interface Props {
    title: string
    menu?: JSX.Element
}

const Header: React.FC<Props> = ({ children, title, menu }) => {
    const [showMenuDialog, setShowMenuDialog] = useState<boolean>(false)
    const description = 'Twitter のイラスト付きツイートを効率よく巡回！フォロー中の絵師さんの投稿を見るのに最適なアプリケーションです。'
    const image = '/images/emiru.png'
    const url = 'https://emiru.pistatium.dev'
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="canonical" href={url} />

                <meta name="viewport" content="width=360,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
                <meta name="application-name" content="emiru(β)" />
                <meta name="theme-color" content="#f0d258" />
                <meta name="description" content={description} />

                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="emiru(β)" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png" />

                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={`${url}${image}`} />
                <meta property="og:site_name" content="emiru(β)" />

                <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />

                <link rel="icon" type="image/png" sizes="512x512" href="/images/android-chrome-512x512.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="/images/icon-128x128.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/images/icon-512x512.png" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={image} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:image" content={`${url}${image}`} />
                <meta name="twitter:description" content={description} />

                <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
                <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
                <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" />
                <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
                <meta name="msapplication-TileColor" content="#0078d7" />

                <link
                    rel="stylesheet"
                    href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
                    integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
                    crossOrigin="anonymous"
                />

                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
            </Head>
            <div className="flex items-center justify-between bg-gray-800 fixed w-full h-12 z-50 px-4">
                <img src="/images/emiru_small.png" className="h-10" />
                <div className="flex-1 min-w-0 py-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <h2 className="text-2xl font-bold leading-7 text-gray-100 select-none sm:truncate">emiru (β)</h2>
                </div>
                {menu != null ? (
                    <button
                        className="md:hidden focus:outline-none focus:bg-gray-600 px-2 rounded-md text-white font-bold"
                        onClick={() => setShowMenuDialog(!showMenuDialog)}
                    >
                        {showMenuDialog ? '閉じる' : '設定'}
                    </button>
                ) : null}
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
