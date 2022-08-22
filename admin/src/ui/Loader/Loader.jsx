import React from 'react'
import './Loader.css'

function Loader({ label }) {
  return (
    <div className='relative w-full h-full text-base-500'>
      {label && (
        <div className='absolute top-1/2 left-1/2 -translate-y-[calc(100%+3rem)] -translate-x-1/2 text-2xl font-bold'>
          {label}
        </div>
      )}
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full'>
        <div className='circle1 absolute w-full h-full rounded-full border-base-500 border-b-4' />
        <div className='circle2 absolute w-full h-full rounded-full border-base-500 border-r-4' />
        <div className='circle3 absolute w-full h-full rounded-full border-base-500 border-t-4' />
      </div>
    </div>
  )
}

export default Loader
