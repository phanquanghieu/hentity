import classNames from 'classnames'
import { useOnClickOutside } from 'hooks'
import { find, pick } from 'lodash'
import React, { useId, useState } from 'react'
import { useRef } from 'react'
import { BiChevronDown, BiX } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

function Select(
  {
    options = [],
    value,
    onChange,
    className,
    label,
    error,
    required,
    isClearable = true,
    isSearchable = false,
    ...rest
  },
  ref
) {
  const [showOptions, setShowOptions] = useState(false)

  const containerRef = useRef()
  const id = useId()
  useOnClickOutside(containerRef, () => setShowOptions(false))

  return (
    <div ref={containerRef} className='relative w-full flex flex-col'>
      {label && (
        <label className='mb-1 text-sm font-medium text-slate-700' htmlFor={id}>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div>
        <div className='relative group'>
          <input
            ref={ref}
            className={twMerge(
              `w-full px-2.5 py-[5px] bg-white
              rounded-md shadow-sm border border-slate-300 
              focus:outline-none focus:border-base-500 group-hover:border-base-500 
              focus:ring-2 focus:ring-offset-2 focus:ring-base-500
              disabled:bg-slate-50 transition cursor-pointer`,
              classNames({
                'border-red-500 focus:border-red-500 focus:ring-red-500': error,
              }),
              className
            )}
            value={value ? find(options, { value })?.label : ''}
            onFocus={() => setShowOptions(true)}
            readOnly={!isSearchable}
            id={id}
            {...pick(rest, ['placeholder', 'disabled'])}
          />
          {isClearable && !!value && (
            <div
              className='absolute right-6 top-0 h-9 w-6 flex justify-center items-center cursor-pointer
            text-slate-600 hover:text-red-500'
              onClick={() => onChange(null)}
            >
              <BiX className='w-5 h-5' />
            </div>
          )}
          <div
            className='absolute right-0 top-0 h-9 w-6 flex justify-center items-center cursor-pointer
          text-slate-600 hover:text-base-500'
            onClick={() => setShowOptions(true)}
          >
            <BiChevronDown className='w-5 h-5' />
          </div>
        </div>
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
          <div
            className={twMerge(
              classNames(
                `absolute top-1.5 w-full max-h-48 overflow-auto py-1 
              bg-white shadow-md rounded-md border border-slate-200 whitespace-nowrap 
                transition scale-y-0 opacity-50 origin-top`,
                { 'scale-y-100 opacity-100': showOptions }
              )
            )}
          >
            {options.map((option) => (
              <div
                className={classNames(
                  'px-2.5 py-1 text-slate-700 cursor-pointer hover:bg-base-100',
                  { 'bg-base-100': option.value === value }
                )}
                onClick={() => {
                  onChange(option.value)
                  setShowOptions(false)
                }}
                key={option.value}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(Select)
