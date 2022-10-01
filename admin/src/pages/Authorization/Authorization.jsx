import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormatMessage } from 'hooks'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'

function Roles() {
  const dispatch = useDispatch()
  const t = useFormatMessage()
  return (
    <div className='relative h-screen overflow-scroll flex-1 flex flex-col'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 border-l shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{t('Roless')}</div>
        <div></div>
      </div>
      <div className='p-8'>
        <div className='p-6 bg-white shadow-md rounded-md flex justify-between'>
          <div className='text-lg font-medium text-slate-700'>Theme Color</div>
          <div className='flex flex-wrap justify-end'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roles

