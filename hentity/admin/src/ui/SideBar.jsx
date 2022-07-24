import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFormatMessage from 'hooks/useFormatMessage'
import { BiChevronLeft } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import logo from 'assets/images/logo.png'

function SideBar({ menus }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const t = useFormatMessage()
  return (
    <div
      className={twMerge(
        `relative w-56 shadow bg-white
        transition-all duration-300 flex flex-col`,
        classNames({ 'w-16 collapsed': isCollapsed })
      )}
    >
      <div className='relative h-16 border-b border-slate-200 flex items-center'>
        <div className='w-16 h-16 p-4'>
          <img className='w-8 h-8' src={logo} alt='' />
        </div>
        <div
          className='absolute left-16 font-bold transition-all duration-300 origin-left
              whitespace-nowrap collapsed:opacity-0 collapsed:scale-0'
        >
          Hentity Dashboard
        </div>
      </div>
      <div className='w-full h-[calc(100%-4rem)] flex flex-col justify-between'>
        <div className='h-full mb-4 p-3 overflow-auto'>
          {menus.map((menu) => (
            <Link to={menu.to}>
              <div
                className='relative mb-3 rounded-md cursor-pointer flex items-center text-slate-500
                    hover:bg-base-50 hover:text-base-500 hover:font-medium'
                key={menu.intlId}
              >
                <div className='w-10 h-10 flex justify-center items-center'>
                  <menu.icon className='w-6 h-6 transition-all duration-300 collapsed:w-7 collapsed:h-7' />
                </div>
                <div
                  className='absolute left-12 ml-1 transition-all duration-300 origin-left
                      whitespace-nowrap collapsed:opacity-0 collapsed:scale-0'
                >
                  {t(null, menu.intlId)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='h-16 border-t border-slate-200 flex justify-center items-center'>
          <Link to='/auth'>Logout</Link>
        </div>
      </div>
      <div
        className='absolute bottom-10 left-52 w-8 h-8 rounded-full shadow-md border
          bg-white flex justify-center items-center
          transition-all duration-300 cursor-pointer collapsed:left-12'
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-hidden='true'
      >
        <BiChevronLeft className='w-6 h-6 text-slate-700 transition duration-300 collapsed:rotate-180' />
      </div>
    </div>
  )
}

export default SideBar
