import * as React from 'react'

interface Props {
    isActive: boolean
    onClick: () => void
    name: string
}

const ListTab: React.FC<Props> = ({ isActive, onClick, name }) => (
    <button
        onClick={onClick}
        className={
            'text-gray-600 py-4 px-4 block text-sm hover:text-blue-500 focus:outline-none truncated nowrap' +
            (isActive ? ' focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500' : '')
        }
    >
        {name}
    </button>
)

export default ListTab
