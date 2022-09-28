import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'hooks'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { BiChevronDown } from 'react-icons/bi'
import Button from 'ui/Button'

function Dropdown({ options = [], value, onChange, color, className }, ref) {
  const [show, setShow] = useState(false)
  const containerRef = useRef()

  useOnClickOutside(containerRef, () => setShow(false))

  return (
    <div className='relative inline' ref={containerRef}>
      <Button
        ref={ref}
        className={classNames('pr-1', className)}
        onClick={() => setShow(!show)}
        color={color}
      >
        <div className='flex justify-center items-center'>
          <div className='mr-1'>{value}</div>
          <BiChevronDown />
        </div>
      </Button>
      <div
        className={twMerge(
          `absolute right-0 z-40 mt-1.5 p-1 rounded-md shadow-md bg-white
          transition opacity-0 origin-top-right scale-50`,
          classNames({ 'opacity-100 scale-100': show })
        )}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className='px-2 py-1 text-sm text-slate-700 rounded-md
                hover:bg-base-100
                cursor-pointer whitespace-nowrap'
            onClick={() => {
              setShow(false)
              onChange(option)
            }}
            aria-hidden='true'
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.forwardRef(Dropdown)
