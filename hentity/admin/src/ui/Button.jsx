import React from 'react'
import { twMerge } from 'tailwind-merge'
import colors from './utils/colors'

function Button({ children, className, color, onClick, ...rest }, ref) {
  return (
    <button
      className={twMerge(
        `px-3 py-1
        rounded-md shadow-sm border 
        border-slate-300 text-slate-600
        hover:brightness-110 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500
        disabled:brightness-90 disabled:shadow-sm disabled:cursor-default
        transition cursor-pointer`,
        colors[color],
        className
      )}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
}

export default React.forwardRef(Button)
