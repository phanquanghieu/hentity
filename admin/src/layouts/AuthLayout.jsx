import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { BiData, BiEdit, BiFilm, BiLowVision, BiWrench } from 'react-icons/bi'
import { Loader, SideBar } from 'ui'

function AuthLayout() {
  return (
    <div className='w-screen h-screen flex bg-slate-100'>
      <SideBar menus={menus} />

      <div className='h-screen min-w-0 flex-1 flex'>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
const menus = [
  {
    label: ['EntityManager', 'EntityManager'],
    to: '/entity_manager',
    icon: BiData,
  },
  {
    label: ['EntityBuilder', 'EntityBuilder'],
    to: '/entity_builder',
    icon: BiEdit,
  },
  {
    label: ['Upload', 'Upload'],
    to: '/upload',
    icon: BiFilm,
  },
  {
    label: ['Permission', 'Permission'],
    to: '/permission',
    icon: BiLowVision,
  },
  {
    label: ['Settings', 'Settings'],
    to: '/settings',
    icon: BiWrench,
  },
]
export default AuthLayout
