import { ceil } from 'lodash'
import React, { useState } from 'react'
import { BiPencil, BiTrashAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { changeQuery, getQuery } from 'redux/slices/entityManagerSlice'
import Checkbox from './Checkbox'
import Input from './Input'
import Pagination from './Pagination'
import Select from './Select'

function Table({ columns, data, count, onClickEdit, onClickDelete }) {
  const query = useSelector(getQuery)
  const dispatch = useDispatch()

  return (
    <div className='relative'>
      <div className='shadow rounded-md text-slate-700 bg-white overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr className='text-left border-b-[1.5px] border-slate-200'>
              <th className='w-10'>
                <div className='h-12 w-10 pr-1 flex items-center'>
                  <Checkbox className='p-0 justify-end' />
                </div>
              </th>
              {columns?.map((column) => (
                <th className='px-3' key={column.key}>
                  <div className='max-w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis'>
                    {column.name}
                  </div>
                </th>
              ))}
              <th className='w-24'>
                <div className='w-24'></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr className='h-96'>
                <td className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-2xl font-medium text-base-500'>
                  No content found
                </td>
              </tr>
            )}
            {data.map((d, index) => (
              <tr className='border-b border-slate-200' key={index}>
                <td className='w-10'>
                  <div className='h-12 w-10 pr-1 flex items-center'>
                    <Checkbox className='p-0 justify-end' />
                  </div>
                </td>
                {columns.map((column) => (
                  <td className='px-3' key={column.key}>
                    <div className='max-w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis'>
                      {d[column.key]}
                    </div>
                  </td>
                ))}
                <td className='absolute right-0 p-0 px-2 border-l bg-white '>
                  <div className='h-12 flex items-center'>
                    <BiPencil
                      className='w-8 h-8 p-1 rounded-full text-blue-500
                        hover:shadow hover:bg-blue-500 hover:text-white cursor-pointer'
                      onClick={() => onClickEdit(d)}
                    />
                    <BiTrashAlt
                      className='w-8 h-8 ml-2 p-1 rounded-full text-red-500
                        hover:shadow hover:bg-red-500 hover:text-white cursor-pointer'
                      onClick={() => onClickDelete(d)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-3 flex justify-between'>
        <div>
          <Select
            options={PAGE_SIZE_OPTIONS}
            value={PAGE_SIZE_OPTIONS.find(
              (PAGE_SIZE_OPTION) => PAGE_SIZE_OPTION.value === query.pageSize
            )}
            onChange={(_pageSize) => dispatch(changeQuery({ pageSize: _pageSize.value }))}
            className='w-28 h-8 pr-0 border-transparent shadow'
            isClearable={false}
          />
        </div>
        <div>
          <Pagination
            pageCount={ceil(count / query.pageSize) || 1}
            page={query.page}
            onChangePage={(_page) => dispatch(changeQuery({ page: _page }))}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Table)

const PAGE_SIZE_OPTIONS = [
  { label: '5 / page', value: 5 },
  { label: '10 / page', value: 10 },
  { label: '20 / page', value: 20 },
  { label: '50 / page', value: 50 },
  { label: '100 / page', value: 100 },
]
