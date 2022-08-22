import React, { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEntities, getEntities } from 'redux/slices/entityBuilderSlice'
import { filter, isEmpty } from 'lodash'
import { Loader, SubSideBar } from 'ui'

const header = ['Entity Builder', 'EntityBuilder']

function EntityBuilderLayout() {
  const entities = useSelector(getEntities)

  const [menus, setMenus] = useState(MENUS)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEntities())
  }, [])

  useEffect(() => {
    if (isEmpty(entities)) return

    let _menus = [...menus]
    _menus[0].links = filter(entities, ['type', 'collection']).map((collection) => ({
      ...collection,
      label: collection.displayName,
      to: `entity/${collection.singularName}`,
    }))
    _menus[1].links = filter(entities, ['type', 'single']).map((single) => ({
      ...single,
      label: single.displayName,
      to: `entity/${single.singularName}`,
    }))

    setMenus(_menus)
  }, [entities])

  return (
    <div className='h-screen flex flex-1'>
      <SubSideBar header={header} menus={menus} />

      {isEmpty(entities) ? (
        <div className='h-screen flex-1'>
          <Loader />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className='h-screen flex-1'>
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      )}
    </div>
  )
}

export default EntityBuilderLayout

const MENUS = [
  {
    label: ['Collection Types'],
    action: {
      label: ['Create new Collection'],
      to: 'entity',
      state: { entityType: 'collection' },
    },
    links: [],
  },
  {
    label: ['Single Types'],
    action: {
      label: ['Create new Single'],
      to: 'entity',
      state: { entityType: 'single' },
    },
    links: [],
  },
  {
    label: ['Components', null],
    action: {
      label: ['Create new Component'],
      to: 'component',
    },
    links: [
      { label: 'c', to: 'component/c' },
      { label: 'c2', to: 'component/c2' },
    ],
  },
]
