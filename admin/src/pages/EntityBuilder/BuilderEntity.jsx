import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAttribute,
  fetchEntities,
  getEntityEdit,
  getShowModalAttribute,
  setAttributeEdit,
  setEntityEditBySingularName,
  setShowModalAttribute,
} from 'redux/slices/entityBuilderSlice'
import { useFormatMessage, useLoading } from 'hooks'
import { BiCheck, BiPencil, BiPlus, BiTrashAlt } from 'react-icons/bi'
import { Button } from 'ui'
import { isEmpty } from 'lodash'
import ModalAttributes from './components/ModalAttributes'
import { ATTRIBUTES } from 'constant/attributes'
import { axios, sleep } from 'utils'

function BuilderEntity() {
  const entityEdit = useSelector(getEntityEdit)
  const showModalAttribute = useSelector(getShowModalAttribute)

  const { singularName } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const setShowLoading = useLoading()
  const t = useFormatMessage()

  useEffect(() => {
    dispatch(setEntityEditBySingularName(singularName))
  }, [singularName])

  const handleSaveEntity = async () => {
    setShowLoading(true)
    const res = await axios.put('/entity_builder/entities', entityEdit, {})
    console.log(res)

    await sleep(1000)
    await dispatch(fetchEntities())
    setShowLoading(false)
  }

  const handleDeleteEntity = async () => {
    setShowLoading(true)
    const res = await axios.delete(`/entity_builder/entities/${entityEdit.singularName}`)
    console.log(res)
    await sleep(1000)
    await dispatch(fetchEntities())
    navigate('/entity_builder/entity')
    setShowLoading(false)
  }

  if (isEmpty(entityEdit)) return

  return (
    <div className='relative h-screen overflow-auto flex-1'>
      <div className='sticky top-0 min-h-[4rem] px-6 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{entityEdit.displayName}</div>
        <div>
          <Button className='mr-6' onClick={handleDeleteEntity}>
            <div className='flex items-center'>
              <BiTrashAlt className='w-5 h-5 -ml-1 mr-1' />
              <div>{t('Delete')}</div>
            </div>
          </Button>
          <Button color='base' onClick={handleSaveEntity}>
            <div className='flex items-center'>
              <BiCheck className='w-5 h-5 -ml-1 mr-1' />
              <div>{t('Save')}</div>
            </div>
          </Button>
        </div>
      </div>
      <div className='p-10'>
        <div className='p shadow-md rounded-t-md text-slate-700 bg-white'>
          <table className='w-full'>
            <thead>
              <tr className='text-left border-b-[1.5px] border-slate-200'>
                <th className='w-1/3 px-4 py-3 font-medium'>Name</th>
                <th className='w-1/3 px-4 py-3 font-medium'>Column</th>
                <th className='w-1/3 px-4 py-3 font-medium'>Type</th>
                <th className='px-4 py-3 font-medium'></th>
              </tr>
            </thead>
            <tbody>
              {entityEdit.attributes.map((attribute) => {
                const ATTRIBUTE = ATTRIBUTES[attribute.type]
                if (!ATTRIBUTE) return
                return (
                  <tr className='border-b border-slate-200' key={attribute.columnName}>
                    <td className='px-4 py-3 font-bold flex'>
                      <ATTRIBUTE.info.icon />
                      <div className='ml-4'>{attribute.displayName || 'sss'}</div>
                    </td>
                    <td className='px-4 py-3'>{attribute.columnName}</td>
                    <td className='px-4 py-3 italic'>{attribute.type}</td>
                    <td className='px-4'>
                      <div className='flex justify-end'>
                        <BiPencil
                          className='w-8 h-8 ml-2 p-1 rounded-full text-blue-500
                              hover:shadow hover:bg-blue-500 hover:text-white cursor-pointer'
                          onClick={() => {
                            dispatch(setAttributeEdit({ ...ATTRIBUTE.model, ...attribute }))
                            dispatch(setShowModalAttribute(true))
                          }}
                        />
                        <BiTrashAlt
                          className='w-8 h-8 ml-2 p-1 rounded-full text-red-500
                              hover:shadow hover:bg-red-500 hover:text-white cursor-pointer'
                          onClick={() => {
                            dispatch(deleteAttribute(attribute))
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div
          className='px-4 py-3 shadow-md rounded-b-md bg-base-100 text-base-500 flex items-center cursor-pointer hover:shadow-lg'
          onClick={() => {
            dispatch(setAttributeEdit({}))
            dispatch(setShowModalAttribute(true))
          }}
        >
          <BiPlus className='w-5 h-5 mr-2 rounded-full bg-base-400 text-white' />
          <div>{t('Add other attribute')}</div>
        </div>
      </div>
      {showModalAttribute && <ModalAttributes />}
    </div>
  )
}

export default BuilderEntity
