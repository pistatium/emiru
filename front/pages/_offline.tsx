import Head from 'next/head'

const Offline: React.FC = () => (
    <>
        <Head>
            <title>emiru(エミル)</title>
        </Head>
        <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center content-center flex-wrap">
            <h1 className="text-4xl text-gray-400">ネットワークがオフラインです</h1>
            <h2 className="mt-4 text-gray-400 text-normal">通信状況のいいところで再度リトライしてください。</h2>
        </div>
    </>
)

export default Offline
