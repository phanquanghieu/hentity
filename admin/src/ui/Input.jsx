import React, { useEffect, useId, useState } from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { pick } from 'lodash'

function Input(
  { label, error, required, value = '', onChange, onBlur, className, type, ...rest },
  ref
) {
  const [valueInner, setValueInner] = useState(value)
  const id = useId()

  useEffect(() => {
    setValueInner(value)
  }, [value])

  return (
    <div className='relative w-full flex flex-col'>
      {label && (
        <label className='mb-1 text-sm font-medium text-slate-700' htmlFor={id}>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <input
        className={twMerge(
          `w-full px-2.5 py-[5px] bg-white
          rounded-md shadow-sm border border-slate-300 
          focus:outline-none focus:border-base-500
          focus:ring-2 focus:ring-offset-2 focus:ring-base-500
          disabled:bg-slate-50 hover:border-base-500
          transition cursor-pointer`,
          classNames({
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          }),
          className
        )}
        value={valueInner}
        onChange={(e) => {
          setValueInner(e.target.value)
          onChange?.(e)
        }}
        onBlur={onBlur}
        ref={ref}
        id={id}
        {...pick(rest, ['type', 'name', 'required', 'readOnly', 'placeholder', 'disabled'])}
      />
      <div className='relative'>
        <div
          className={twMerge(
            `absolute top-1 -translate-y-1/2 opacity-50
            text-xs text-red-500 transition`,
            classNames({ 'translate-y-0 opacity-100': error })
          )}
        >
          {error}
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(Input)
