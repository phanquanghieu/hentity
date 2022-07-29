import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader, SubSideBar } from 'ui'

function EntityBuilder() {
  const header = ['Entity Builder', 'EntityBuilder']
  const menus = [
    {
      label: ['Collection Types'],
      action: {
        label: ['Create new Collection'],
        to: 'entity/create',
        state: { entityType: 'collection' },
      },
      links: [
        { label: 'book', to: 'entity/api::book' },
        { label: 's', to: 'entity/api::s' },
      ],
    },
    {
      label: ['Single Types'],
      action: {
        label: ['Create new Single'],
        to: 'entity/create',
        state: { entityType: 'single' },
      },
      links: [{ label: 'one', to: 'entity/api::one' }],
    },
    {
      label: ['Components', null],
      action: {
        label: ['Create new Component'],
        to: 'component/create',
      },
      links: [
        { label: 'c', to: 'component/c' },
        { label: 'c2', to: 'component/c2' },
      ],
    },
  ]
  return (
    <div className='h-screen flex flex-1'>
      <SubSideBar header={header} menus={menus} />

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

export default EntityBuilder
