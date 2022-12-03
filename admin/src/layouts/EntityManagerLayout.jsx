import React, { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEntities, getEntities } from 'redux/slices/entityManagerSlice'
import { Loader, SubSideBar } from 'ui'
import { filter, isEmpty } from 'lodash'

function EntityManagerLayout() {
  const entities = useSelector(getEntities)

  const [menus, setMenus] = useState(MENUS)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEntities())
  }, [])

  useEffect(() => {
    const _entities = entities.filter((entity) => !entity.hidden)
    if (isEmpty(_entities)) return

    let _menus = [...menus]
    _menus[0].links = filter(_entities, ['type', 'collection']).map((collection) => ({
      ...collection,
      label: collection.displayName,
      to: `collection/${collection.singularName}`,
    }))
    _menus[1].links = filter(_entities, ['type', 'single']).map((single) => ({
      ...single,
      label: single.displayName,
      to: `single/${single.singularName}`,
    }))

    setMenus(_menus)
  }, [entities])

  return (
    <>
      <SubSideBar header={['Entity Manager', 'EntityManager']} menus={menus} />

      <div className='h-screen min-w-0 flex-1 flex'>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default EntityManagerLayout

const MENUS = [
  {
    label: ['Collection Types'],
    links: [],
  },
  {
    label: ['Single Types'],
    links: [],
  },
  // {
  //   label: ['Components', null],
  //   links: [],
  // },
]
