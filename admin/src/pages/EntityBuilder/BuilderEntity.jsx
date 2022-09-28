import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAttribute,
  getEntityEdit,
  getShowModalAttribute,
  setAttributeEdit,
  setEntityEditBySingularName,
  setShowModalAttribute,
} from 'redux/slices/entityBuilderSlice'
import { useFormatMessage, useLoading } from 'hooks'
import { BiBookAlt, BiCheck, BiPencil, BiPlus, BiTrashAlt } from 'react-icons/bi'
import { Button } from 'ui'
import classNames from 'classnames'
import { axios, isDevelopment, sleep } from 'utils'
import ModalAttributes from './components/ModalAttributes'
import { ATTRIBUTES } from 'constant/attributes'

function BuilderEntity() {
  const entityEdit = useSelector(getEntityEdit)
  const showModalAttribute = useSelector(getShowModalAttribute)

  const { singularName } = useParams()
  const dispatch = useDispatch()
  const setShowLoading = useLoading()
  const t = useFormatMessage()

  useEffect(() => {
    dispatch(setEntityEditBySingularName(singularName))
  }, [singularName])
  useEffect(() => setShowLoading(false), [entityEdit])

  const handleSaveEntity = async () => {
    setShowLoading(true)
    await axios.put('/entity_builder/entities', entityEdit)

    await sleep(1000)
    window.location.reload()
  }

  const handleDeleteEntity = async () => {
    setShowLoading(true)
    await axios.delete(`/entity_builder/entities/${entityEdit.singularName}`)

    await sleep(1000)
    window.location.replace('/entity_builder/entity')
  }

  return (
    <div className='relative h-screen overflow-scroll flex-1 flex flex-col'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{entityEdit.displayName}</div>
        <div>
          {isDevelopment() && (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className='p-8 min-w-0 flex-1 flex flex-col'>
        <div className='relative'>
          <div
            className={classNames('shadow-md rounded-t-md text-slate-700 bg-white overflow-auto', {
              'rounded-md': !isDevelopment(),
            })}
          >
            <table className='w-full'>
              <thead>
                <tr className='text-left border-b-[1.5px] border-slate-200 font-medium'>
                  <th className='w-1/2 px-4'>
                    <div className='h-12 flex items-center'> Name</div>
                  </th>
                  <th className='w-1/2 px-4'>
                    <div className='h-12 flex items-center'> Column</div>
                  </th>
                  <th className='w-32 px-4'>
                    <div className='h-12 w-32 flex items-center'> Type</div>
                  </th>
                  <th className='w-24'>
                    <div className='w-24'></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {entityEdit?.attributes?.map?.((attribute) => {
                  const ATTRIBUTE = ATTRIBUTES[attribute.type]
                  const IconEdit = isDevelopment() ? BiPencil : BiBookAlt
                  if (!ATTRIBUTE) return
                  return (
                    <tr className='border-b border-slate-200' key={attribute.columnName}>
                      <td className='px-4'>
                        <div className='h-12 flex items-center font-bold'>
                          <ATTRIBUTE.info.icon />
                          <div className='ml-4 whitespace-nowrap'>
                            {attribute.displayName || 'sss'}
                          </div>
                        </div>
                      </td>
                      <td className='px-4'>
                        <div className='h-12 flex items-center'>{attribute.columnName}</div>
                      </td>
                      <td className='px-4'>
                        <div className='h-12 flex items-center italic'>{attribute.type}</div>
                      </td>
                      <td className='absolute right-0 px-2 border-l bg-white'>
                        <div className='h-12 flex items-center'>
                          <IconEdit
                            className='w-8 h-8 p-1 rounded-full text-blue-500
                              hover:shadow hover:bg-blue-500 hover:text-white cursor-pointer'
                            onClick={() => {
                              dispatch(setAttributeEdit({ ...ATTRIBUTE.model, ...attribute }))
                              dispatch(setShowModalAttribute(true))
                            }}
                          />
                          {isDevelopment() && (
                            <BiTrashAlt
                              className='w-8 h-8 ml-2 p-1 rounded-full text-red-500
                              hover:shadow hover:bg-red-500 hover:text-white cursor-pointer'
                              onClick={() => {
                                dispatch(deleteAttribute(attribute))
                              }}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {isDevelopment() && (
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
          )}
        </div>
      </div>
      {showModalAttribute && <ModalAttributes />}
    </div>
  )
}

export default BuilderEntity
