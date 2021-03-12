import Header from '../components/header'
import Footer from '../components/footer'
import React, { useState } from 'react'

import Timeline from '../components/timeline'
import Menu from '../components/menu'

export default function Main(props) {
    const [onlyFollowersRT, setOnlyFollowersRT] = useState<boolean>(false)
    const [filterSensitive, setFilterSensitive] = useState<boolean>(true)

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
                        <Timeline onlyFollowersRT={onlyFollowersRT} filterSensitive={filterSensitive} />
                    </div>

                    <div className="flex-none md:block md:w-1/2 spx-auto">
                        <div className="fixed hidden md:block px-6" style={{ maxWidth: 512 }}>
                            {menu}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
