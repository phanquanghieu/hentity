import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Loader } from 'ui'
import ProtectedRoute from 'components/ProtectedRoute'

const UnAuthLayout = React.lazy(() => import('layouts/UnAuthLayout'))
const AuthLayout = React.lazy(() => import('layouts/AuthLayout'))
const EntityManagerLayout = React.lazy(() => import('layouts/EntityManagerLayout'))
const EntityBuilderLayout = React.lazy(() => import('layouts/EntityBuilderLayout'))

const NotFound = React.lazy(() => import('pages/NotFound'))
const Login = React.lazy(() => import('pages/UnAuthPage/Login'))
const EntityManager = React.lazy(() => import('pages/EntityManager'))
const ManagerCollection = React.lazy(() => import('pages/EntityManager/ManagerCollection'))
const ManagerSingle = React.lazy(() => import('pages/EntityManager/ManagerSingle'))
const BuilderEntity = React.lazy(() => import('pages/EntityBuilder/BuilderEntity'))
const BuilderComponent = React.lazy(() => import('pages/EntityBuilder/BuilderComponent'))
const CreateEntity = React.lazy(() => import('pages/EntityBuilder/CreateEntity'))
const CreateComponent = React.lazy(() => import('pages/EntityBuilder/CreateComponent'))
const Upload = React.lazy(() => import('pages/Upload'))
const Permission = React.lazy(() => import('pages/Permission'))
const Settings = React.lazy(() => import('pages/Settings'))

function RootRouter() {
  return (
    <BrowserRouter basename={process.env.ADMIN_PATH}>
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
            <Route index element={<Navigate replace to='entity_manager' />} />

            <Route path='entity_manager' element={<EntityManagerLayout />}>
              <Route index element={<EntityManager />} />

              <Route path='collection/:singularName' element={<ManagerCollection />} />
              <Route path='single/:singularName' element={<ManagerSingle />} />
            </Route>

            <Route path='entity_builder' element={<EntityBuilderLayout />}>
              <Route index element={<Navigate to='entity' />} />

              <Route path='entity/:singularName' element={<BuilderEntity />} />
              <Route path='entity' element={<CreateEntity />} />

              <Route path='component/:singularName' element={<BuilderComponent />} />
              <Route path='component' element={<CreateComponent />} />
            </Route>

            <Route path='upload' element={<Upload />} />
            <Route path='permission' element={<Permission />}/>
            <Route path='settings' element={<Settings />}/>
          </Route>

          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default RootRouter
