import React from 'react'
import _ from 'lodash'

function App() {
  return (
    <div className='flex justify-center items-center text-xl text-green-500'>
      {_.camelCase('sss ss   sssssssdSSSddd')}
      <h1 className='text-5xl font-bold underline'>Hello world!</h1>
    </div>
  )
}

export default App
