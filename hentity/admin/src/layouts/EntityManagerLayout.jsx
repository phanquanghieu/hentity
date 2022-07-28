import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader, SubSideBar } from 'ui'

function EntityManagerLayout() {
  return (
    <div className='h-screen flex flex-1'>
      <SubSideBar />
      {/* <Suspense
        fallback={
          <div className='h-screen flex-1'>
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense> */}
      <div className='h-screen flex-1'>
        <Loader />
      </div>
    </div>
  )
}

export default EntityManagerLayout
