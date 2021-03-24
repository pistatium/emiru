import Header from '../components/header'
import Footer from '../components/footer'
import React, { useState } from 'react'
import axios from 'axios'
import { GetListResponse, List } from '../types/lists'
import useSWR from 'swr'
import ListCell from '../components/list_cell'

const fetcher = url => axios.get<GetListResponse>('/app/api/lists').then(res => res.data)

const MAX_LIST_SIZE = 3

export default function EditList(props) {
    //const { data, error } = useSWR('lists', fetcher)
    const data = {
        lists: [
            {
                id: '1212694737632681986',
                name: 'b',
                description: '',
                creator: {
                    name: 'kimihiro_n',
                    icon: 'https://pbs.twimg.com/profile_images/1141706435190853632/UBZCLFxL_normal.jpg',
                    profile: 'Python や Go でサーバーサイドの開発してます。昔は Android アプリも作ってました。 / ロードバイク / イラスト描き / Pistatium',
                    link: 'https://twitter.com/kimihiro_n',
                },
            },
            {
                id: '103115876',
                name: 'a',
                description: 'aaaaaa',
                creator: {
                    name: 'kimihiro_n',
                    icon: 'https://pbs.twimg.com/profile_images/1141706435190853632/UBZCLFxL_normal.jpg',
                    profile: 'Python や Go でサーバーサイドの開発してます。昔は Android アプリも作ってました。 / ロードバイク / イラスト描き / Pistatium',
                    link: 'https://twitter.com/kimihiro_n',
                },
            },
            {
                id: '1031158761',
                name: 'a2',
                description: 'aaaaaa',
                creator: {
                    name: 'kimihiro_n',
                    icon: 'https://pbs.twimg.com/profile_images/1141706435190853632/UBZCLFxL_normal.jpg',
                    profile: 'Python や Go でサーバーサイドの開発してます。昔は Android アプリも作ってました。 / ロードバイク / イラスト描き / Pistatium',
                    link: 'https://twitter.com/kimihiro_n',
                },
            },
            {
                id: '1031158762',
                name: 'a3',
                description: 'aaaaaa',
                creator: {
                    name: 'kimihiro_n',
                    icon: 'https://pbs.twimg.com/profile_images/1141706435190853632/UBZCLFxL_normal.jpg',
                    profile: 'Python や Go でサーバーサイドの開発してます。昔は Android アプリも作ってました。 / ロードバイク / イラスト描き / Pistatium',
                    link: 'https://twitter.com/kimihiro_n',
                },
            },
        ],
    }
    const [selectedList, setSelectedList] = useState<Array<string>>([])
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
