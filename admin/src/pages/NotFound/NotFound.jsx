import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'ui'

function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='text-3xl text-blue-600 mb-3'>NotFound</div>
      <Button>
        <Link to='/'>Back to home</Link>
      </Button>
    </div>
  )
}

export default NotFound
