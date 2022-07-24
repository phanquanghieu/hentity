import React, { useId } from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

function Input({ label, error, required, value = '', onChange, className, type, ...rest }, ref) {
  const id = useId()

  return (
    <div className='relative w-full mb-6 flex flex-col'>
      {label && (
        <label className='mb-1 text-sm font-medium text-slate-700' htmlFor={id}>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <input
        className={twMerge(
          `w-full px-2.5 py-1 bg-white
          rounded-md shadow-sm border border-slate-300 
          focus:outline-none focus:border-base-500
          focus:ring-2 focus:ring-offset-2 focus:ring-base-500
          disabled:bg-slate-50
          transition cursor-pointer`,
          classNames({
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          }),
          className
        )}
        type={type}
        value={value}
        onChange={onChange}
        ref={ref}
        id={id}
        {...rest}
      />
      <div
        className={twMerge(
          `absolute -bottom-5 -translate-y-1/2 opacity-50
          text-xs text-red-500 transition`,
          classNames({ 'translate-y-0 opacity-100': error })
        )}
      >
        {error}
      </div>
    </div>
  )
}

export default React.forwardRef(Input)
