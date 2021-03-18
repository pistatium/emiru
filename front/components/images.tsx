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
        case 4:
            return (
                <div className="w-full flex flex-wrap">
                    <div className="w-1/2 flex flex-col h-96">
                        <div className="w-full h-48">
                            <a
                                className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                onClick={() => onClickImage(0)}
                                title="Link"
                                style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                            />
                        </div>
                        <div className="w-full h-48 pt-1">
                            <a
                                className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                onClick={() => onClickImage(1)}
                                title="Link"
                                style={{ backgroundImage: 'url(' + images[1].url + ')' }}
                            />
                        </div>
                    </div>

                    <div className="w-1/2 flex flex-col h-96">
                        <div className="w-full h-48 pl-1">
                            <a
                                className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                onClick={() => onClickImage(2)}
                                title="Link"
                                style={{ backgroundImage: 'url(' + images[2].url + ')' }}
                            />
                        </div>
                        <div className="w-full h-48 pt-1 pl-1">
                            <a
                                className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                onClick={() => onClickImage(3)}
                                title="Link"
                                style={{ backgroundImage: 'url(' + images[3].url + ')' }}
                            />
                        </div>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className="flex flex-row flex-wrap h-96">
                    <div className="w-1/2 h-64 h-96">
                        <a
                            className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                            onClick={() => onClickImage(0)}
                            style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                        />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className="w-full h-48 pl-1 pb-1">
                            <a
                                className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                onClick={() => onClickImage(1)}
                                style={{ backgroundImage: 'url(' + images[1].url + ')' }}
                            />
                        </div>
                        <div className="w-full h-48 pl-1">
                            <a
                                className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                                onClick={() => onClickImage(2)}
                                style={{ backgroundImage: 'url(' + images[2].url + ')' }}
                            />
                        </div>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="flex flex-row flex-wrap h-96">
                    <div className="w-1/2 h-96 h-96">
                        <a
                            className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                            onClick={() => onClickImage(0)}
                            title="Link"
                            style={{ backgroundImage: 'url(' + images[0].url + ')' }}
                        />
                    </div>
                    <div className="w-1/2 h-64 h-96 pl-1">
                        <a
                            className="block w-full h-full bg-grey-dark bg-no-repeat bg-top bg-cover"
                            onClick={() => onClickImage(1)}
                            title="Link"
                            style={{ backgroundImage: 'url(' + images[1].url + ')' }}
                        />
                    </div>
                </div>
            )

        default:
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
                    imagePadding={24}
                />
            )}
        </>
    )
}

export default Images
