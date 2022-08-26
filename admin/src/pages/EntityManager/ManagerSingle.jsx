import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEntities,
  getSingleEntity,
  setSingleEntity,
  setSingleEntityBySingularName,
} from 'redux/slices/entityManagerSlice'
import { useFormatMessage } from 'hooks'
import { toast } from 'react-toastify'
import { Loader } from 'ui'
import { axios } from 'utils'
import { get, isEmpty } from 'lodash'
import EntityEditor from './components/EntityEditor'
import { isNull } from 'lodash'

function ManagerSingle() {
  const entities = useSelector(getEntities)
  const singleEntity = useSelector(getSingleEntity)

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { singularName } = useParams()
  const dispatch = useDispatch()
  const t = useFormatMessage()

  const fetchData = async () => {
    setIsLoading(true)
    const res = await axios.get(`/entity_manager/single/${singleEntity.singularName}`)
    setData(get(res, 'data', {}))
    setIsLoading(false)
  }

  useEffect(() => {
    dispatch(setSingleEntityBySingularName(singularName))
    return () => dispatch(setSingleEntity({}))
  }, [singularName, entities])

  useEffect(() => {
    if (isEmpty(singleEntity)) return
    fetchData()
  }, [singleEntity])

  const handleSaveData = async (_data) => {
    let res = await axios.put(`/entity_manager/single/${singleEntity.singularName}`, _data)
    if (res.error) return toast.error('Update error!')
    toast.success('Update success!')

    fetchData()
  }

  if (isEmpty(singleEntity)) return <Loader />
  return (
    <div className='relative h-screen overflow-scroll flex-1 flex flex-col'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{singleEntity.displayName}</div>
        <div></div>
      </div>
      <div className='p-8 min-w-0 flex-1 flex flex-col'>
        {isLoading || isEmpty(singleEntity) ? (
          <Loader />
        ) : (
          <EntityEditor
            mode={'edit'}
            attributesModel={singleEntity.attributes}
            dataEdit={data}
            onSaveData={handleSaveData}
          />
        )}
      </div>
    </div>
  )
}

export default ManagerSingle
