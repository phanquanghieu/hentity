import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Loader } from 'ui'
import ProtectedRoute from 'components/ProtectedRoute'

const UnAuthLayout = React.lazy(() => import('layouts/UnAuthLayout'))
const AuthLayout = React.lazy(() => import('layouts/AuthLayout'))
const EntityManagerLayout = React.lazy(() => import('layouts/EntityManagerLayout'))
const NotFound = React.lazy(() => import('pages/NotFound'))
const Login = React.lazy(() => import('pages/UnAuthPage/Login'))
const EntityManager = React.lazy(() => import('pages/EntityManager'))
const EntityBuilder = React.lazy(() => import('pages/EntityBuilder'))
// const Settings = React.lazy(() => import('pages/Settings'))

function RootRouter() {
  return (
    <BrowserRouter basename='/'>
      <Suspense
        fallback={
          <div className='w-screen h-screen'>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path='auth' element={<UnAuthLayout />}>
            <Route index element={<Navigate replace to='login' />} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<Navigate replace to='/404' />} />
          </Route>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <AuthLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to='entity-manager' />} />
            <Route path='entity-manager' element={<EntityManagerLayout />}>
              {/* <Route path='collection:' element={<EntityManagerLayout />} /> */}
            </Route>
            <Route path='entity-builder' element={<EntityBuilder />} />
            <Route path='upload' element={<EntityManager />} />
            {/* <Route path='settings' element={<SettingsLayout />} >

            </Route> */}
          </Route>
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate replace to='/404' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default RootRouter
