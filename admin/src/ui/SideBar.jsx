import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFormatMessage } from 'hooks'
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
        `relative w-52 shadow bg-white
        transition-all duration-300 flex flex-col flex-shrink-0`,
        classNames({ 'w-16 collapsed': isCollapsed })
      )}
    >
      <div className='relative h-16 border-b border-slate-200 flex items-center'>
        <div className='w-16 h-16 flex justify-center items-center'>
          <img className='w-10 h-10' src={logo} alt='' />
        </div>
        <div
          className='absolute left-16 text-slate-700 font-bold transition-all duration-300 origin-left
              collapsed:opacity-0 collapsed:scale-0'
        >
          Hentity Dashboard
        </div>
      </div>
      <div className='w-full h-[calc(100%-4rem)] flex flex-col justify-between'>
        <div className='h-full mb-4 p-3 overflow-auto'>
          {menus.map((menu) => (
            <NavLink
              to={menu.to}
              className={({ isActive }) => (isActive ? 'selected' : '')}
              key={menu.to}
            >
              <div
                className='relative mb-3 rounded-md cursor-pointer flex items-center text-slate-500
                    hover:bg-slate-100 hover:text-base-500
                    selected:bg-base-100 selected:text-base-600 selected:font-medium'
              >
                <div className='w-10 h-10 flex justify-center items-center'>
                  <menu.icon className='w-6 h-6 transition-all duration-300 collapsed:w-7 collapsed:h-7' />
                </div>
                <div
                  className='absolute left-12 ml-1 transition-all duration-300 origin-left
                      whitespace-nowrap collapsed:opacity-0 collapsed:scale-0'
                >
                  {t(...menu.label)}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className='h-16 border-t border-slate-200 flex justify-center items-center'>
          <Link to='/auth'>Logout</Link>
        </div>
      </div>
      <div
        className='absolute bottom-10 left-48 w-8 h-8 rounded-full shadow-md border
          bg-white text-slate-700 flex justify-center items-center hover:shadow-lg
          transition-all duration-300 cursor-pointer collapsed:left-12'
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-hidden='true'
      >
        <BiChevronLeft className='w-6 h-6 transition duration-300 collapsed:rotate-180' />
      </div>
    </div>
  )
}

export default SideBar
