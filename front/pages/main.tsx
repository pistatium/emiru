import Header from '../components/header'
import Footer from '../components/footer'
import React, { useState } from 'react'

import Timeline from '../components/timeline'

export default function Main(props) {
    const [onlyFollowersRT, setOnlyFollowersRT] = useState<boolean>(false)
    const [filterSensitive, setFilterSensitive] = useState<boolean>(true)

    return (
        <div className="bg-gray-100">
            <Header title={'emiru - mainフィード'} image={''} url={''} />

            <div className="lg:container xl:mx-auto xl:px-24">
                <div className="flex md:flex-row">
                    <div className="flex-auto flex flex-col w-1/2 xl:px-6">
                        <Timeline onlyFollowersRT={onlyFollowersRT} filterSensitive={filterSensitive} />
                    </div>

                    <div className="flex-none hidden lg:block lg:w-1/2 spx-auto">
                        <div className="fixed hidden lg:block px-6" style={{ width: 480 }}>
                            <div className="text-2xl my-4">設定</div>
                            <div className="bg-white px-6 py-4 mx-auto rounded-lg shadow-md">
                                <div className="w-full">
                                    <ul className="-mx-4">
                                        <li className="flex items-center mb-2">
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input
                                                    type="checkbox"
                                                    name="toggle_rt"
                                                    id="toggle_rt"
                                                    checked={onlyFollowersRT}
                                                    onChange={() => setOnlyFollowersRT(!onlyFollowersRT)}
                                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                />
                                                <label
                                                    htmlFor="toggle_rt"
                                                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                />
                                            </div>
                                            <label htmlFor="toggle_rt" className="text-lg text-gray-700">
                                                フォロー外のRTを表示しない
                                                <div className="text-xs text-gray-500">Onにするとフォロー中のユーザーのみの画像になります。</div>
                                            </label>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input
                                                    type="checkbox"
                                                    name="toggle_sensitive"
                                                    id="toggle_sensitive"
                                                    checked={filterSensitive}
                                                    onChange={() => setFilterSensitive(!filterSensitive)}
                                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                />
                                                <label
                                                    htmlFor="toggle_sensitive"
                                                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                />
                                            </div>
                                            <label htmlFor="toggle_sensitive" className="text-lg text-gray-700">
                                                センシティブな画像を表示しない
                                                <div className="text-xs text-gray-500">Twitter でセンシティブと判定された画像を非表示にします。</div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-2xl my-4">その他</div>
                            <div className="bg-white px-6 mx-auto rounded-lg shadow-md">
                                <div className="w-full">
                                    <ul className="-mx-4">
                                        <li className="p-4 hover:bg-gray-50 cursor-pointer">
                                            <a className="text-lg text-gray-700" href="#" rel="noreferrer" target="_blank">
                                                使い方
                                            </a>
                                        </li>
                                        <li className="p-4 hover:bg-gray-50 cursor-pointer">
                                            <a
                                                className="text-lg text-gray-700"
                                                href="https://github.com/pistatium/emiru/discussions"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                お問い合わせ
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
