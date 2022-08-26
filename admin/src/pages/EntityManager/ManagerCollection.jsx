import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCollectionEntity,
  getEntities,
  getQuery,
  setCollectionEntity,
  setCollectionEntityBySingularName,
} from 'redux/slices/entityManagerSlice'
import { useFormatMessage } from 'hooks'
import { toast } from 'react-toastify'
import { BiPlus } from 'react-icons/bi'
import { Button, Loader, Table } from 'ui'
import { axios } from 'utils'
import { get, isEmpty } from 'lodash'
import ModalCollection from './components/ModalCollection'

function ManagerCollection() {
  const entities = useSelector(getEntities)
  const collectionEntity = useSelector(getCollectionEntity)
  const query = useSelector(getQuery)

  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [dataEdit, setDataEdit] = useState({})
  const [mode, setMode] = useState('')
  const [showModalCollection, setShowModalCollection] = useState(false)

  const { singularName } = useParams()
  const dispatch = useDispatch()
  const t = useFormatMessage()

  const fetchData = async () => {
    const res = await axios.get(`/entity_manager/collection/${collectionEntity.singularName}`, {
      params: query,
    })
    setData(get(res, 'data', []))
    setCount(get(res, 'metadata.count', 0))
  }

  useEffect(() => {
    dispatch(setCollectionEntityBySingularName(singularName))
    return () => dispatch(setCollectionEntity({}))
  }, [singularName, entities])

  useEffect(() => {
    if (isEmpty(collectionEntity)) return
    fetchData()
  }, [collectionEntity, query])

  const handleSaveData = async (_dataEdit) => {
    let res
    if (mode === 'create') {
      res = await axios.post(
        `/entity_manager/collection/${collectionEntity.singularName}`,
        _dataEdit
      )
      if (res.error) return toast.error('Create error!')
      toast.success('Create success!')
    } else {
      res = await axios.put(
        `/entity_manager/collection/${collectionEntity.singularName}/${dataEdit.id}`,
        _dataEdit
      )
      if (res.error) return toast.error('Update error!')
      toast.success('Update success!')
    }
    setShowModalCollection(false)
    fetchData()
  }

  const handleDeleteData = async (dataDelete) => {
    const res = await axios.delete(
      `/entity_manager/collection/${collectionEntity.singularName}/${dataDelete.id}`
    )
    if (res.error) return toast.error('Delete error!')
    toast.success('Delete success!')
    setShowModalCollection(false)
    fetchData()
  }

  const columns = useMemo(
    () =>
      collectionEntity.attributes?.map?.((attribute) => ({
        name: attribute.displayName,
        key: attribute.columnName,
      })),
    [collectionEntity]
  )

  return (
    <div className='relative h-screen overflow-scroll flex-1 flex flex-col'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{collectionEntity.displayName}</div>
        <div>
          <Button
            color='base'
            onClick={() => {
              setDataEdit({})
              setMode('create')
              setShowModalCollection(true)
            }}
          >
            <div className='flex items-center'>
              <BiPlus className='w-5 h-5 -ml-1 mr-1' />
              <div>{t('Create new entity')}</div>
            </div>
          </Button>
        </div>
      </div>
      <div className='p-8 min-w-0 flex-1 flex flex-col'>
        <Table
          columns={columns}
          data={data}
          count={count}
          onClickEdit={(_dataEdit) => {
            setDataEdit(_dataEdit)
            setMode('edit')
            setShowModalCollection(true)
          }}
          onClickDelete={handleDeleteData}
        />
      </div>
      {showModalCollection && (
        <ModalCollection
          collectionEntity={collectionEntity}
          dataEdit={{ ...dataEdit }}
          mode={mode}
          onSaveData={handleSaveData}
          onDeleteData={handleDeleteData}
          onClose={() => setShowModalCollection(false)}
        />
      )}
    </div>
  )
}

export default ManagerCollection
