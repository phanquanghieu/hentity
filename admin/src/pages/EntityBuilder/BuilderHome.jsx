import React from 'react'
import { Button } from 'ui'
import { axios } from 'utils'

function BuilderHome() {
  const handleClick = async () => {
    // const data = await axios.get('/entity_builder/entities')
    const data = await axios.get('/api', { params: { sss: 444, dd: [333, '55'], obj: { $gt: 5 } } })
    console.log(data)
  }
  console.count('BuilderHome')
  return (
    <div>
      <Button onClick={handleClick}>ddd</Button>
    </div>
  )
}

export default React.memo(BuilderHome)
