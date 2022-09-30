import React from 'react'
import { Select } from 'ui'

function Enum(p, ref) {
  return (
    <Select
      ref={ref}
      {...p}
      options={(p.enum || []).map((e) => ({ label: e, value: e }))}
      value={{ label: p.value, value: p.value }}
      onChange={(_value) => p.onChange(_value?.value || null)}
    />
  )
}

export default React.forwardRef(Enum)
