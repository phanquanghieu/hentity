import React, { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { isNil } from 'lodash'

function Boolean({ value, onChange, className, label, error, required, disabled }, ref) {
  const id = useId()
  return (
    <div className='relative flex flex-col'>
      {label && (
        <label className='mb-1 text-sm font-medium text-slate-700' htmlFor={id}>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div>
        <div
          className={twMerge(
            `relative w-32 h-9 bg-white
            rounded-md shadow-sm border border-slate-300 
            group-hover:border-base-500 transition cursor-pointer
            flex justify-center items-center`,
            classNames({
              'border-red-500 focus:border-red-500 focus:ring-red-500': error,
              'bg-slate-50 cursor-not-allowed pointer-events-none': disabled,
            }),
            className
          )}
          id={id}
          ref={ref}
        >
          <div
            className={twMerge(
              classNames(
                'absolute left-1 h-7 w-[62px] rounded-md shadow bg-red-500 transition-all',
                {
                  'left-[60px] bg-blue-500': value === false,
                  hidden: isNil(value),
                }
              )
            )}
          ></div>
          <div className='absolute w-28 flex justify-between items-'>
            <div
              className={twMerge(
                classNames('w-14 text-slate-600 flex justify-center items-center transition', {
                  'text-white': value === true,
                })
              )}
              onClick={() => onChange(true)}
            >
              True
            </div>
            <div
              className={twMerge(
                classNames('w-14 text-slate-600 flex justify-center items-center transition', {
                  'text-white': value === false,
                })
              )}
              onClick={() => onChange(false)}
            >
              False
            </div>
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
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(Boolean)
