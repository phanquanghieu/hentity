import React from 'react'
import InputWidgets from '../InputWidgets'

function InputBase({ inputWidget, inputWidgetType, ...rest }, ref) {
  const InputWidget = InputWidgets[inputWidget]
  if (InputWidget) return <InputWidget ref={ref} type={inputWidgetType} {...rest} />

  return <div>Invalid Widget {rest.label}{inputWidget}</div>
}

export default React.forwardRef(InputBase)
