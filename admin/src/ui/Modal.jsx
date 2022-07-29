import React, { useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import { BiX } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

function Modal({ children, show, onClose, className, header }) {
  const modalElement = useRef(document.createElement('div')).current
  useEffect(() => {
    modalElement.classList.add('relative')
    document.body.appendChild(modalElement)
    return () => {
      document.body.removeChild(modalElement)
    }
  }, [])

  return ReactDom.createPortal(
    show ? (
      <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-slate-700/40'>
        <div className='h-full p-5 overflow-auto flex justify-center'>
          <div className={twMerge('relative w-[50rem] h-fit my-8 bg-white rounded-md', className)}>
            <div
              className='absolute -right-3 -top-3 p-1 text-slate-700 bg-white shadow-md rounded-full
                 hover:bg-red-500 hover:text-white transition cursor-pointer'
              onClick={onClose}
              aria-hidden='true'
            >
              <BiX className='w-6 h-6' />
            </div>
            {header && (
              <div className='py-4 px-5 border-b border-slate-200 text-2xl text-slate-700 font-medium'>
                {header}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    ) : null,
    modalElement
  )
}

export default Modal
