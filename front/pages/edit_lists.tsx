import Header from '../components/header'
import Footer from '../components/footer'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GetListResponse, List } from '../types/lists'
import useSWR from 'swr'
import ListCell from '../components/list_cell'

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
        console.log(selectedList)
        console.log(selectedList.join(','))
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
                <div className="flex-1 m-4 bg-white rounded-md">
                    <h2 className="text-2xl m-4">リスト編集</h2>
                    {error ? (
                        <div className="my-6 font-medium py-4 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300">
                            リストの読み込みに失敗しました。時間をおいてリトライしてください。
                        </div>
                    ) : null}
                    {isLimited() ? (
                        <div className="bg-yellow-100 rounded-md p-4 m-2 text-sm text-yellow-900">リスト登録できる上限は{MAX_LIST_SIZE}つまでです</div>
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
