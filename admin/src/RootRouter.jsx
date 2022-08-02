import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Loader } from 'ui'
import ProtectedRoute from 'components/ProtectedRoute'
import IndexPage from 'pages/EntityManager/components/IndexPage'

const UnAuthLayout = React.lazy(() => import('layouts/UnAuthLayout'))
const AuthLayout = React.lazy(() => import('layouts/AuthLayout'))
const EntityManagerLayout = React.lazy(() => import('layouts/EntityManagerLayout'))
const EntityBuilderLayout = React.lazy(() => import('layouts/EntityBuilderLayout'))

const NotFound = React.lazy(() => import('pages/NotFound'))
const Login = React.lazy(() => import('pages/UnAuthPage/Login'))
const Upload = React.lazy(() => import('pages/Upload'))
const EntityManager = React.lazy(() => import('pages/EntityManager'))
const BuilderHome = React.lazy(() => import('pages/EntityBuilder/BuilderHome'))
const BuilderEntity = React.lazy(() => import('pages/EntityBuilder/BuilderEntity'))
const BuilderComponent = React.lazy(() => import('pages/EntityBuilder/BuilderComponent'))
const CreateEntity = React.lazy(() => import('pages/EntityBuilder/CreateEntity'))
const CreateComponent = React.lazy(() => import('pages/EntityBuilder/CreateComponent'))
// const Settings = React.lazy(() => import('pages/Settings'))

function RootRouter() {
  return (
    <BrowserRouter basename='/admin'>
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
              <Route index element={<IndexPage />} />
              <Route path='collection-type/:entityUid' element={<EntityManagerLayout />} />
              <Route path='single-type/:entityUid' element={<EntityManagerLayout />} />
            </Route>
            <Route path='entity-builder' element={<EntityBuilderLayout />}>
              <Route index element={<BuilderHome />} />
              <Route path='entity/:entityUid' element={<BuilderEntity />} />
              <Route path='entity/create' element={<CreateEntity />} />
              <Route path='component/:componentUid' element={<BuilderComponent />} />
              <Route path='component/create' element={<CreateComponent />} />
            </Route>
            <Route path='upload' element={<Upload />} />
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