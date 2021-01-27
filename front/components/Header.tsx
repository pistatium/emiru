import * as React from 'react'
import Head from 'next/head'


interface Props {
  title: string
  image: string
  url: string
}

const Header: React.FC<Props> = ({children, title, image, url}) => (
  <Head>
    <title>{title}</title>npm install -D eslint prettier eslint-plugin-react
    <meta property="og:title" content={title}/>
    <meta property="og:type" content="blog"/>
    <meta property="og:url" content={url}/>
    <meta property="og:image" content={image}/>
    <meta property="og:site_name" content={title}/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="@tcr_jp"/>
    <meta name="twitter:url" content={image}/>
    <meta name="twitter:title" content={title}/>
    <meta name="twitter:image" content={image}/>
    <link rel="canonical" href={url}/>
    <link rel="shortcut icon" href={'https://t-cr.jp/favicon.ico'}/>
    <link rel="apple-touch-icon" href={'https://t-cr.jp/logo.png'}/>
  </Head>
)

export default Header
