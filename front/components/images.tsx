import * as React from 'react'
import Lightbox from 'react-image-lightbox'
import { TweetImage } from '../types/tweets'
import 'react-image-lightbox/style.css'
interface Props {
    images: Array<TweetImage>
}

type CallbackFunction = (number) => void

const getImageView = (images: Array<TweetImage>, onClickImage: CallbackFunction): JSX.Element => {
    switch (images.length) {
        case 1:
            return (
                <div className="flex flex-row flex-wrap h-96">
                    <a
                        className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                        onClick={() => onClickImage(0)}
                        title="Link"
                        style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                    />
                </div>
            )
        case 2:
            return (
                <div className="flex flex-row flex-wrap h-96">
                    <div className="w-full md:w-1/2 h-96 md:h-auto mb-1 px-1">
                        <a
                            className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                            href="#"
                            title="Link"
                            style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                        />
                    </div>
                    <div className="w-full md:w-1/2 h-64 md:h-auto mb-1">
                        <a
                            className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                            href="#"
                            title="Link"
                            style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                        />
                    </div>
                </div>
            )
        case 3:
            return (
                <div className="flex flex-row flex-wrap">
                    <div className="w-full md:w-1/2 h-64 md:h-auto mb-1">
                        <a
                            className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                            href="#"
                            title="Link"
                            style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                        />
                    </div>
                    <div className="w-full md:w-1/2 mb-1">
                        <div className="flex flex-col sm:flex-row md:flex-col ">
                            <div className="w-full sm:w-1/2 md:w-full h-48 mb-4 sm:mb-0">
                                <a
                                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                    href="#"
                                    title="Link"
                                    style={{ backgroundImage: 'url(' + images[1].url + ')' }}
                                />
                            </div>
                            <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-1">
                                <a
                                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                    href="#"
                                    title="Link"
                                    style={{ backgroundImage: 'url(' + images[2].url + ')' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className="flex flex-row flex-wrap">
                    <div className="w-full md:w-1/2 mb-1">
                        <div className="flex flex-col sm:flex-row md:flex-col -mx-2">
                            <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 mb-1">
                                <a
                                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                    href="#"
                                    title="Link"
                                    style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                                />
                            </div>
                            <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-1">
                                <a
                                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                    href="#"
                                    title="Link"
                                    style={{ backgroundImage: 'url(' + images[1].url + ')' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mb-4 px-1">
                        <div className="flex flex-col sm:flex-row md:flex-col -mx-2">
                            <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 mb-1">
                                <a
                                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                    href="#"
                                    title="Link"
                                    style={{ backgroundImage: 'url(' + images[2].url + ')' }}
                                />
                            </div>
                            <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-2">
                                <a
                                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                    href="#"
                                    title="Link"
                                    style={{ backgroundImage: 'url(' + images[3].url + ')' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

const Images: React.FC<Props> = ({ children, images }) => {
    const [isOpen, setOpen] = React.useState<boolean>(false)
    const [photoIndex, setPhotoIndex] = React.useState<number>(0)
    const onClickImage = (index: number) => {
        setOpen(true)
        setPhotoIndex(index)
    }
    return (
        <>
            {getImageView(images, onClickImage)}
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex].url}
                    nextSrc={images[(photoIndex + 1) % images.length].url}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
                    onCloseRequest={() => setOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    imagePadding={3}
                />
            )}
        </>
    )
}

export default Images
