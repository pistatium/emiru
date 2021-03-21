import Header from '../components/header'
import Footer from '../components/footer'
import React, { useState } from 'react'
import axios from 'axios'
import { GetListResponse, List } from '../types/lists'
import useSWR from 'swr'
import ListCell from '../components/list_cell'

const fetcher = url => axios.get<GetListResponse>('/app/api/lists').then(res => res.data)

export default function EditList(props) {
    const { data, error } = useSWR('lists', fetcher)
    return (
        <div className="bg-gray-100">
            <Header title={'emiru - リスト編集'} image={''} url={''} />
            <div className="lg:container xl:mx-auto xl:px-24">
                {data?.lists.map(l => (
                    <ListCell list={l} />
                ))}
            </div>
            <Footer></Footer>
        </div>
    )
}
