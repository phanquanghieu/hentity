import React, { useId } from 'react'
import CodeMirror from '@uiw/react-codemirror'

function Json({ value, onChange, className, label, error, required, disabled }, ref) {
  const id = useId()
  return (
    <div className='relative flex flex-col'>
      {label && (
        <label className='mb-1 text-sm font-medium text-slate-700'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div className='rounded-md overflow-hidden border border-slate-200'>
        <CodeMirror
          value={value}
          onChange={onChange}
          height='200px'
          options={{
            tabSize: 2,
            keyMap: 'sublime',
            mode: 'json',
          }}
          readOnly={disabled}
          id={id}
          ref={ref}
        />
      </div>
    </div>
  )
}

export default React.forwardRef(Json)
