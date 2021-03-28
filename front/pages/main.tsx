import Header from '../components/header'
import Footer from '../components/footer'
import React, { useEffect, useState } from 'react'

import Timeline from '../components/timeline'
import Menu from '../components/menu'
import { List } from '../types/lists'
import ListTab from '../components/list_tab'

export default function Main(props) {
    const [onlyFollowersRT, setOnlyFollowersRT] = useState<boolean>(false)
    const [filterSensitive, setFilterSensitive] = useState<boolean>(true)
    const [myList, setMyList] = useState<Array<List>>([])
    const [activeList, setActiveList] = useState<string>('')
    useEffect(() => {
        const lists: Array<List> = JSON.parse(localStorage.getItem('lists'))
        setMyList(lists)
    }, [])

    const menu = (
        <Menu
            onlyFollowersRT={onlyFollowersRT}
            filterSensitive={filterSensitive}
            setOnlyFollowersRT={setOnlyFollowersRT}
            setFilterSensitive={setFilterSensitive}
        />
    )
    return (
        <div className="bg-gray-100">
            <Header title={'emiru - mainフィード'} image={''} url={''} menu={menu} />

            <div className="lg:container xl:mx-auto xl:px-24">
                <div className="flex sm:flex-row">
                    <div className="flex-auto flex flex-col w-1/2">
                        {myList != [] ? (
                            <nav className="flex flex-row">
                                <ListTab
                                    name="ホーム"
                                    onClick={() => {
                                        setActiveList('')
                                    }}
                                    isActive={'' === activeList}
                                />
                                {myList.map(l => {
                                    return (
                                        <ListTab
                                            key={l.id}
                                            name={l.name}
                                            onClick={() => {
                                                setActiveList(l.id)
                                            }}
                                            isActive={l.id === activeList}
                                        />
                                    )
                                })}
                            </nav>
                        ) : null}

                        <Timeline listID={activeList} onlyFollowersRT={onlyFollowersRT} filterSensitive={filterSensitive} />
                    </div>

                    <div className="flex-none md:block md:w-1/2 spx-auto">
                        <div className="fixed hidden md:block px-6" style={{ maxWidth: 512 }}>
                            {menu}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
