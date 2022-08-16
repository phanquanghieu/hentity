import React from 'react'
import { Button } from 'ui'
import { axios } from 'utils'

function BuilderHome() {
  const handleClick = async () => {
    const data = await axios.get('/entity_builder/entities')
    console.log(data)
  }
  return (
    <div>
      <Button onClick={handleClick}>dddd</Button>
    </div>
  )
}

export default BuilderHome
