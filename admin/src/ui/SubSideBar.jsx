import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormatMessage } from 'hooks'
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { upperCase } from 'lodash'
import { isDevelopment } from 'utils'

function SubSideBar({ header = [], menus = [] }) {
  const t = useFormatMessage()

  return (
    <div className='w-52 h-screen shadow bg-slate-50'>
      <div className='h-16 pl-4 border-b border-x bg-white text-lg font-bold text-slate-700 flex items-center'>
        {t(...header)}
      </div>
      <div className='h-[calc(100%-4rem)] mb-4 overflow-auto'>
        {menus.map((menu, index) => (
          <Collapse menu={menu} key={index} />
        ))}
      </div>
    </div>
  )
}

function Collapse({ menu }) {
  const [show, setShow] = useState(true)
  const t = useFormatMessage()

  return (
    <div className={classNames('text-slate-600', { collapsed: !show })}>
      <div
        className='mt-4 py-2 pl-5 pr-3 text-sm font-medium
            flex justify-between items-center cursor-pointer
            hover:bg-slate-100'
        onClick={() => setShow(!show)}
        aria-hidden='true'
      >
        <div>{upperCase(t(...menu.label))}</div>
        <BiChevronDown className='w-5 h-5  transition-all collapsed:rotate-180' />
      </div>
      <div
        className={twMerge('h-auto transition-all origin-top collapsed:scale-y-0 collapsed:h-0')}
      >
        {menu.links.map((link) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'selected' : '')}
            to={link.to}
            key={link.to}
          >
            <div
              className='py-2 px-6 flex items-center cursor-pointer transition-all
                  hover:bg-slate-100 selected:text-base-500
                  selected:bg-base-50 selected:border-r-[3px] selected:border-base-500'
            >
              <BsDot className='w-5 h-5 mr-1' />
              <div>{link.label}</div>
            </div>
          </NavLink>
        ))}
      </div>
      {isDevelopment() && menu.action && (
        <NavLink to={menu.action.to} state={menu.action.state}>
          <div className='py-2 px-6 text-xs text-base-500 flex items-center hover:bg-slate-100'>
            <BiPlus className='w-4 h-5 mr-1 pb-0.5' />
            <div>{t(...menu.action.label)}</div>
          </div>
        </NavLink>
      )}
    </div>
  )
}

export default React.memo(SubSideBar)
