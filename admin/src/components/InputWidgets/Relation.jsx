import React from 'react'
import { useSelector } from 'react-redux'
import { getEntityBySingularName } from 'redux/slices/entityManagerSlice'
import { Select } from 'ui'

function Relation(p, ref) {
  const entityTarget = useSelector(getEntityBySingularName(p.reference))
  return (
    <div>
      <Select ref={ref} {...p} options={['d', 'w'].map((e) => ({ label: e, value: e }))} />
    </div>
  )
}

export default React.forwardRef(Relation)
