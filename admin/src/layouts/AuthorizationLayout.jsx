import React, { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoles, getRoles, setPermissions, setRoles } from 'redux/slices/authorizationSlice'
import { filter, isEmpty } from 'lodash'
import { Loader, SubSideBar } from 'ui'
import { axios } from 'utils'

function AuthorizationLayout() {
  const roles = useSelector(getRoles)

  const [menus, setMenus] = useState(MENUS)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const _roles = (await axios.get('/auth/roles'))?.data || []
      const _permissions = (await axios.get('/auth/permissions'))?.data || []
      dispatch(setRoles(_roles))
      dispatch(setPermissions(_permissions))
      setIsLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isEmpty(roles)) return
    let _menus = [...menus]
    _menus[0].links = roles.map((role) => ({
      label: role.name,
      to: `roles/${role.id}`,
    }))
    setMenus(_menus)
  }, [roles])

  return (
    <>
      <SubSideBar header={['Authorization', 'Authorization']} menus={menus} isCollapsible={false} />

      <div className='h-screen min-w-0 flex-1 flex'>
        {isLoading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default AuthorizationLayout

const MENUS = [
  {
    label: [`User Roles`],
    action: {
      label: ['Create new Role'],
      to: 'create',
    },
    links: [],
  },
  // {
  //   label: ['Components', null],
  //   action: {
  //     label: ['Create new Component'],
  //     to: 'component',
  //   },
  //   links: [],
  // },
]
