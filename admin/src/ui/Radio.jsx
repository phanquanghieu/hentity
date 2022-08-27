import React, { useId } from 'react'
import { twMerge } from 'tailwind-merge'

function Radio({ options = [], label, name, value, onChange, className }, ref) {
  const id = useId()
  return (
    <div className='relative w-full flex flex-col' ref={ref}>
      {label && <label className='mb-1 text-sm font-medium'>{label}</label>}
      <div className={twMerge('w-full', className)}>
        {options.map((option) => (
          <div className='py-1.5 flex items-center flex-1' key={option.value}>
            <input
              className='w-5 h-5 shadow-sm border border-slate-300 text-base-500 transition cursor-pointer
              hover:brightness-110 hover:shadow-md hover:border-base-500 checked:hover:brightness-110 checked:hover:shadow-md
              focus:ring-2 focus:ring-offset-2 focus:ring-base-500 '
              checked={value === option.value}
              onChange={onChange}
              value={option.value}
              name={name}
              id={id + option.value}
              type='radio'
            />
            <label className='ml-2  text-slate-700' htmlFor={id + option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.forwardRef(Radio)
