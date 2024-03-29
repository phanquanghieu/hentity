import React, { useId } from 'react'
import { twMerge } from 'tailwind-merge'

function Checkbox({ label, value, onChange, className, ...rest}, ref) {
  const id = useId()
  return (
    <div className={twMerge('relative w-full py-1.5 flex items-center', className)} ref={ref}>
      <input
        className='w-5 h-5 shadow-sm rounded border border-slate-300 text-base-500 transition cursor-pointer
              hover:brightness-110 hover:shadow-md hover:border-base-500 checked:hover:brightness-110 checked:hover:shadow-md
              focus:ring-2 focus:ring-offset-2 focus:ring-base-500 '
        checked={value}
        onChange={onChange}
        id={id}
        type='checkbox'
        {...rest}
      />
      {label && (
        <label className='ml-2  text-slate-700' htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  )
}

export default React.forwardRef(Checkbox)
