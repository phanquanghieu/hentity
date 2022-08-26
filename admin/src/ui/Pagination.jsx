import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import Input from './Input'

function Pagination({ page, pageCount, onChangePage }) {
  return (
    <div className='flex space-x-1 text-md text-slate-500'>
      {page !== 1 && (
        <div
          className='w-8 h-8 bg-white border shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md'
          onClick={() => onChangePage(1)}
        >
          {1}
        </div>
      )}

      {page - 2 > 1 && (
        <div className='w-8 h-8 bg-white shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md'>
          <BiDotsHorizontalRounded />
        </div>
      )}

      {page - 1 > 1 && (
        <div
          className='w-8 h-8 bg-white border shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md'
          onClick={() => onChangePage(page - 1)}
        >
          {page - 1}
        </div>
      )}

      <div
        className='w-8 h-8 bg-white border shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md
          text-base-500 border-base-500'
      >
        {page}
      </div>

      {page + 1 < pageCount && (
        <div
          className='w-8 h-8 bg-white border shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md'
          onClick={() => onChangePage(page + 1)}
        >
          {page + 1}
        </div>
      )}

      {page + 2 < pageCount && (
        <div className='w-8 h-8 bg-white shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md'>
          <BiDotsHorizontalRounded />
        </div>
      )}

      {pageCount !== 1 && pageCount !== page && (
        <div
          className='w-8 h-8 bg-white border shadow rounded-full flex justify-center items-center cursor-pointer hover:shadow-md'
          onClick={() => onChangePage(pageCount)}
        >
          {pageCount}
        </div>
      )}

      <div>
        <Input
          type='number'
          className='w-12 h-8 ml-1 pr-0 border-transparent shadow text-center'
          value={page}
          onBlur={(e) => {
            let _page = Number(e.target.value) || page
            if (_page < 1 || _page > pageCount) {
              e.target.value = page
              return
            }
            onChangePage(_page)
          }}
        />
      </div>
    </div>
  )
}

export default Pagination
