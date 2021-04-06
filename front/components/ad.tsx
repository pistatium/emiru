import React from 'react'
import AdSense from 'react-adsense'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
    return <div className="bg-white rounded-md" />
}

const Ad: React.FC = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AdSense.Google client="ca-pub-2359565431337443" slot="8532085154" style={{ display: 'block' }} layout="in-article" format="fluid" />
        </ErrorBoundary>
    )
}

export default Ad
