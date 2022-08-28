import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBaseColor, setBaseColor } from 'redux/slices/themeSlice'
import { useFormatMessage } from 'hooks'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { COLOR_INFOS } from 'constant/colors'
import { BiCheck } from 'react-icons/bi'

function Settings() {
  const baseColor = useSelector(getBaseColor)
  const dispatch = useDispatch()
  const t = useFormatMessage()
  return (
    <div className='relative h-screen overflow-scroll flex-1 flex flex-col'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 border-l shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{t('Settings')}</div>
        <div></div>
      </div>
      <div className='p-8'>
        <div className='p-6 bg-white shadow-md rounded-md flex justify-between'>
          <div className='text-lg font-medium text-slate-700'>Theme Color</div>
          <div className='flex flex-wrap justify-end'>
            {COLOR_OPTIONS.map((COLOR_OPTION) => (
              <div
                className={`w-8 h-8 m-1 border-[3px] border-transparent rounded shadow cursor-pointer flex justify-center items-center
                    hover:shadow-xl hover:border-white ${COLOR_INFOS[COLOR_OPTION].bg}`}
                onClick={() => dispatch(setBaseColor(COLOR_OPTION))}
              >
                {baseColor === COLOR_OPTION && <BiCheck className='w-6 h-6 text-white' />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

const COLOR_OPTIONS = [
  'slate',
  ,
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
