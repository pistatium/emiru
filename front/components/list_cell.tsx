import { List } from '../types/lists'
import React from 'react'

interface Props {
    list: List
}

const ListCell: React.FC<Props> = ({ list }) => {
    return (
        <div className="w-full bg-white p-4">
            <div>{list.name}</div>
            <div>{list.description}</div>
            <div className="flex">
                <img src={list.creator.icon} className="h-4 w-4 mr-1" />
                <div className="text-sm">{list.creator.name}</div>
            </div>
        </div>
    )
}

export default ListCell
