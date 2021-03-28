import Header from '../components/header'
import Footer from '../components/footer'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GetListResponse, List } from '../types/lists'
import useSWR from 'swr'
import ListCell from '../components/list_cell'
import Link from 'next/link'
const fetcher = url => axios.get<GetListResponse>('/app/api/lists').then(res => res.data)

const MAX_LIST_SIZE = 3

export default function EditList(props) {
    const { data, error } = useSWR('lists', fetcher)
    const [selectedList, setSelectedList] = useState<Array<string>>([])

    useEffect(() => {
        const lists = localStorage.getItem('lists')
        if (lists != undefined) {
            setSelectedList(lists.split(','))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('lists', selectedList.join(','))
    }, [selectedList])

    const onClickList = (listId: string, checked: boolean) => {
        if (!checked) {
            setSelectedList([...selectedList, listId])
        } else {
            setSelectedList(selectedList.filter(i => i != listId))
        }
    }
    const isLimited = () => {
        return selectedList.length >= MAX_LIST_SIZE
    }
    return (
        <div className="lg:container xl:mx-auto xl:px-24 bg-gray-100">
            <Header title={'emiru - リスト編集'} image={''} url={''} />
            <div className="flex">
                <div className="op-0 xl:w-1/4"></div>
                <div className="flex-1 m-4 p-4 bg-white rounded-md">
                    <div className="flex">
                        <h2 className="flex-1 text-2xl">リスト編集</h2>
                        <Link href="/main">
                            <a className="inline-block px-8 py-3 text-center leading-none text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded shadow">
                                完了
                            </a>
                        </Link>
                    </div>
                    <div className="my-4 text-sm text-gray-400">
                        Twitter のリストを選択して、リストタイムラインを表示できます。選択できるリストは3つまでです。
                    </div>
                    {error ? (
                        <div className="m-2 py-4 px-2 text-sm bg-white rounded-md text-red-700 bg-red-100 border border-red-300">
                            リストの読み込みに失敗しました。時間をおいてリトライしてください。
                        </div>
                    ) : null}
                    {isLimited() ? (
                        <div className="bg-yellow-100 rounded-md p-4 m-2 text-sm text-yellow-900">リスト登録できる上限は{MAX_LIST_SIZE}つまでです。</div>
                    ) : null}
                    <div className="col-start-2 col-span-6 divide-y">
                        {data?.lists.map(l => (
                            <ListCell checked={selectedList.includes(l.id)} onClickList={onClickList} key={l.id} list={l} disabled={isLimited()} />
                        ))}
                    </div>
                </div>
                <div className="op-0 xl:w-1/4"></div>
            </div>
            <Footer></Footer>
        </div>
    )
}
