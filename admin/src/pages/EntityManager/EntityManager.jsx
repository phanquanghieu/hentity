import React from 'react'

function EntityManager() {
  return (
    <div className='px-20 py-14 text-slate-700 flex flex-1 flex-col bg-gradient-to-tr from-transparent via-transparent to-base-100'>
      <div className='font-semibold text-4xl'>Welcome to Hentity Dashboard</div>
      <div className='mt-4 font-medium text-2xl'>
        Hentity is a headless CMS help you design APIs fast, manage content easily.
      </div>
      <div className='mt-4 font-medium text-lg'>Feature:</div>
      <div className='mt-2 ml-6 text-lg'>* Entity Builder</div>
      <div className='mt-2 ml-6 text-lg'>* Entity Manager</div>
      <div className='mt-2 ml-6 text-lg'>* Media Manager</div>
      <div className='mt-2 ml-6 text-lg'>* Role & Permission</div>
      <div className='mt-2 ml-6 text-lg'>* Customize APIs</div>
    </div>
  )
}

export default EntityManager
