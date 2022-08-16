import React from 'react'

function AttributeEditor({ attribute, onChangeAttribute }) {
  return <div>{JSON.stringify(attribute, null, 2)}</div>
}

export default AttributeEditor
