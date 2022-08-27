import React from 'react'
import { Select } from 'ui'

function Enum(p, ref) {
  return <Select ref={ref} {...p} options={(p.enum || []).map((e) => ({ label: e, value: e }))} />
}

export default React.forwardRef(Enum)
