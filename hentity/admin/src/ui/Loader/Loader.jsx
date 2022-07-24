import React from 'react'
import './Loader.css'

function Loader() {
  return (
    <div className='relative w-full h-full text-base-500'>
      <div className='absolute top-[calc(50%-50px)] left-[calc(50%-32px)] w-16 h-16 rounded-full'>
        <div className='circle1 absolute w-full h-full rounded-full border-base-500 border-b-4' />
        <div className='circle2 absolute w-full h-full rounded-full border-base-500 border-r-4' />
        <div className='circle3 absolute w-full h-full rounded-full border-base-500 border-t-4' />
      </div>
    </div>
  )
}

export default Loader
