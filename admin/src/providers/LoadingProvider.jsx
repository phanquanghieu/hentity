import React, { useState } from 'react'
import { Loader } from 'ui'

export const LoadingContext = React.createContext()

function LoadingProvider({ children }) {
  const [showLoading, setShowLoading] = useState(false)
  return (
    <LoadingContext.Provider value={{ showLoading, setShowLoading }}>
      {children}
      {showLoading && (
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-white/80'>
          <Loader label={'Waiting for restart'} />
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
