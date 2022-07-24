import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { BiData, BiEdit, BiFilm, BiWrench } from 'react-icons/bi'
import { Loader, SideBar } from 'ui'

function AuthLayout() {
  return (
    <div className='w-screen h-screen flex bg-slate-100'>
      <SideBar menus={menus} />
      <Suspense
        fallback={
          <div className='h-screen flex-1'>
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  )
}
const menus = [
  {
    intlId: 'EntityManager',
    to: '/entity-manager',
    icon: BiData,
  },
  {
    intlId: 'EntityBuilder',
    to: '/entity-builder',
    icon: BiEdit,
  },
  {
    intlId: 'Upload',
    to: '/upload',
    icon: BiFilm,
  },
  {
    intlId: 'Settings',
    to: '/settings',
    icon: BiWrench,
  },
]
export default AuthLayout
