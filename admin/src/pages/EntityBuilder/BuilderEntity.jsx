import { useFormatMessage } from 'hooks'
import React, { useEffect, useState } from 'react'
import { BiCheck, BiPencil, BiPlus, BiTrash, BiTrashAlt } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { Button, Modal } from 'ui'
import ModalAttributes from './components/ModalAttributes'

function BuilderEntity() {
  const [entity, setEntity] = useState({})
  const [attribute, setAttribute] = useState(null)
  const [show, setShow] = useState(false)
  const t = useFormatMessage()
  const location = useLocation()

  useEffect(() => {
    const _entity = location.state?.entity
    if (_entity) setEntity(_entity)
  }, [location])

  console.log(location)
  return (
    <div className='relative h-screen overflow-auto flex-1'>
      <div className='sticky top-0 min-h-[4rem] px-5 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{entity.displayName}</div>
        <Button onClick={() => setShow(!show)} color='base'>
          <div className='flex items-center'>
            <BiCheck className='w-5 h-5 -ml-1 mr-1' />
            <div>{t('Save')}</div>
          </div>
        </Button>
      </div>
      <div className='p-10'>
        <div className='p shadow-md rounded-t-md text-slate-700 bg-white'>
          <table className='w-full'>
            <thead>
              <tr className='text-left border-b border-slate-200'>
                <th className='px-4 py-3 font-medium'>Name</th>
                <th className='px-4 py-3 font-medium'>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-4 py-3 font-bold'>ddd</td>
                <td className='px-4 py-3 italic'>sss</td>
                <td className='px-4'>
                  <div className='flex justify-end'>
                    <BiPencil className='w-8 h-8 ml-2 p-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer' />
                    <BiTrashAlt className='w-8 h-8 ml-2 p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white cursor-pointer' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='px-4 py-3 shadow-md rounded-b-md bg-base-100 text-base-500 flex items-center cursor-pointer'>
          <BiPlus className='w-5 h-5 mr-2 rounded-full bg-base-400 text-white' />
          <div>{t('Add other attribute')}</div>
        </div>
      </div>
      <ModalAttributes attribute={attribute} show={show} onClose={() => setShow(false)} />
    </div>
  )
}

export default BuilderEntity
