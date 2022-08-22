import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAttributeEdit,
  getAttributeEditIndex,
  getEntityEdit,
  saveAttributeEdit,
  setAttributeEdit,
  setShowModalAttribute,
} from 'redux/slices/entityBuilderSlice'
import { useFormatMessage } from 'hooks'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from 'ui'
import { has } from 'lodash'
import { errorTransIds, yup } from 'utils'
import BNormal from './BNormal'
import BRelation from './BRelation'
import BSettings from './BSettings'

function AttributeBuilder() {
  const entityEdit = useSelector(getEntityEdit)
  const attributeEdit = useSelector(getAttributeEdit)
  const attributeEditIndex = useSelector(getAttributeEditIndex)

  const attributeSchema = yup.object({
    displayName: yup.string().trim().required(errorTransIds.required),
    columnName: yup.string().trim().required(errorTransIds.required).isSnakeCase(),
    enum: yup.lazy(() =>
      has(attributeEdit, 'enum') ? yup.array().min(1, errorTransIds.required) : yup.mixed()
    ),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({ resolver: yupResolver(attributeSchema), mode: 'onSubmit' })

  const dispatch = useDispatch()
  const t = useFormatMessage()

  const isDuplicatedColumnName = (value) => {
    const isDuplicated = entityEdit.attributes
      .filter((attribute, index) => index !== attributeEditIndex)
      .some((attribute) => attribute.columnName === value)
    if (isDuplicated)
      setError('columnName', { message: errorTransIds.unique }, { shouldFocus: true })
    return isDuplicated
  }

  return (
    <>
      <div className='m-3'>
        {attributeEdit.type === 'relation' ? (
          <BRelation />
        ) : (
          <BNormal control={control} errors={errors} setValue={setValue} />
        )}
        <BSettings control={control} />
      </div>
      <div className='px-5 py-4 border-t flex justify-between'>
        <Button onClick={() => dispatch(setShowModalAttribute(false))}>{t('Cancel')}</Button>
        <div>
          <Button
            className='mr-5 bg-white text-base-500'
            color='base'
            onClick={handleSubmit((_attribute) => {
              if (isDuplicatedColumnName(_attribute.columnName)) return
              dispatch(saveAttributeEdit(_attribute))
              dispatch(setAttributeEdit({}))
            })}
          >
            {t('Add another field')}
          </Button>
          <Button
            onClick={handleSubmit((_attribute) => {
              if (isDuplicatedColumnName(_attribute.columnName)) return
              dispatch(saveAttributeEdit(_attribute))
              dispatch(setShowModalAttribute(false))
            })}
            color='base'
          >
            {t('Finish')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default AttributeBuilder
