import { List } from '../types/lists'
import React from 'react'

interface Props {
    list: List
    checked: boolean
    disabled: boolean
    onClickList: (listId: string, checked: boolean) => void
}

const ListCell: React.FC<Props> = ({ list, checked, disabled, onClickList }) => {
    return (
        <div
            className={'w-full bg-white p-4 flex ' + (disabled && !checked ? 'opacity-50' : '')}
            onClick={() => (disabled && !checked ? null : onClickList(list.id, checked))}
        >
            <label className="flex justify-start items-start mr-2 mt-3">
                <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    <input type="checkbox" checked={checked} readOnly className="opacity-0 absolute hidden" disabled />
                    <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                </div>
            </label>
            <div className="flex-1">
                <div className="text-xl">{list.name}</div>
                <div className="text-gray-400 text-sm">{list.description}</div>
                <div className="flex">
                    <img src={list.creator.icon} className="h-4 w-4 mr-1" />
                    <div className="text-sm">{list.creator.name}</div>
                </div>
            </div>
        </div>
    )
}

export default ListCell
