import * as React from 'react'


interface Props {
  images: Array<any>
}

const Images: React.FC<Props> = ({children, images}) => {
  switch (images.length) {
    case 1:
      return (
        <div className="flex flex-row flex-wrap -mx-2 h-96">
          <a
            className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
            href="#"
            title="Link"
            style={{backgroundImage: 'url(' + images[0].url + ')'}}
          >
            image 1
          </a>
        </div>
      )
    case 2:
      return (
        <div className="flex flex-row flex-wrap -mx-2 h-96">
          <div className="w-full md:w-1/2 h-96 md:h-auto mb-1 px-1">
            <a
              className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
              href="#"
              title="Link"
              style={{backgroundImage: 'url(' + images[0].url + ')'}}
            >
              image 1
            </a>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-auto mb-1">
            <a
              className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
              href="#"
              title="Link"
              style={{backgroundImage: 'url(' + images[0].url + ')'}}
            >
              image 1
            </a>
          </div>
        </div>
      )
    case 3:
      return (
        <div className="flex flex-row flex-wrap -mx-2">
          <div className="w-full md:w-1/2 h-64 md:h-auto mb-1">
            <a
              className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
              href="#"
              title="Link"
              style={{backgroundImage: 'url(' + images[0].url + ')'}}
            >
              image 1
            </a>
          </div>
          <div className="w-full md:w-1/2 mb-1">
            <div className="flex flex-col sm:flex-row md:flex-col -mx-2">
              <div className="w-full sm:w-1/2 md:w-full h-48 mb-4 sm:mb-0">
                <a
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  href="#"
                  title="Link"
                  style={{backgroundImage: 'url(' + images[1].url + ')'}}
                >
                  image2
                </a>
              </div>
              <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-1">
                <a
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  href="#"
                  title="Link"
                  style={{backgroundImage: 'url(' + images[2].url + ')'}}
                >
                  Link
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="flex flex-row flex-wrap -mx-2">
          <div className="w-full md:w-1/2 mb-1">
            <div className="flex flex-col sm:flex-row md:flex-col -mx-2">
              <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 mb-1">
                <a
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  href="#"
                  title="Link"
                  style={{backgroundImage: 'url(' + images[0].url + ')'}}
                >
                  image2
                </a>
              </div>
              <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-1">
                <a
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  href="#"
                  title="Link"
                  style={{backgroundImage: 'url(' + images[1].url + ')'}}
                >
                  Link
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mb-4 px-1">
            <div className="flex flex-col sm:flex-row md:flex-col -mx-2">
              <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 mb-1">
                <a
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  href="#"
                  title="Link"
                  style={{backgroundImage: 'url(' + images[2].url + ')'}}
                >
                  image2
                </a>
              </div>
              <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-2">
                <a
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  href="#"
                  title="Link"
                  style={{backgroundImage: 'url(' + images[3].url + ')'}}
                >
                  Link
                </a>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Images
