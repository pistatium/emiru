import * as React from 'react'

const Footer: React.FC = () => (
    <footer className="w-full text-center text-gray-400 mt-8 pb-3">
        <div className="text-normal">
            emiru をツイートして応援！
            <div className="inline-block align-middle pb-1">
                <a
                    href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                    className="twitter-share-button text-blue-400"
                    data-url="https://emiru.pistatium.dev/"
                    data-lang="ja"
                    data-show-count="false"
                >
                    Tweet
                </a>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
        </div>
        <div className="mt-4">
            ©2021 <a href="https://pistatium.dev">pistatium</a>
        </div>
    </footer>
)

export default Footer
