import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useFormatMessage } from 'hooks'
import { yupResolver } from '@hookform/resolvers/yup'

import { BiPlus, BiSave, BiTrashAlt } from 'react-icons/bi'
import { Button } from 'ui'
import InputBase from 'components/InputBase'
import { ATTRIBUTES } from 'constant/attributes'
import { isNil, pickBy } from 'lodash'

function EntityEditor({ mode, attributesModel, dataEdit, onSaveData, onDeleteData, showDelete }) {
  const attributes = useMemo(() => calcAttributes(attributesModel), [attributesModel])
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onSubmit' })
  const t = useFormatMessage()

  const onSubmit = (data) => {
    onSaveData(pickBy(data, (d) => d !== ''))
  }

  return (
    <div className='flex'>
      <div className='w-3/4 pr-5'>
        <div className='p-3 py-5 rounded-md shadow bg-white flex flex-wrap'>
          {Object.values(attributes).map((attribute) => (
            <div className={`${attribute.info.layout.width} px-3 pb-6`} key={attribute.key}>
              <Controller
                name={attribute.key}
                defaultValue={
                  !isNil(dataEdit?.[attribute.key])
                    ? dataEdit?.[attribute.key]
                    : attribute.model.defaultValue
                }
                control={control}
                render={({ field }) => (
                  <InputBase
                    {...attribute.model}
                    label={attribute.model.displayName}
                    inputWidget={attribute.info.inputWidget}
                    inputWidgetType={attribute.info.inputWidgetType}
                    required={attribute.model.required}
                    {...field}
                    onChange={(e) => {
                      field.onChange(
                        attribute.info.inputWidgetType === 'number' ? Number(e.target.value) : e
                      )
                    }}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-1/4 '>
        <div className='flex flex-col space-y-3'>
          <Button onClick={handleSubmit(onSubmit)} color={mode === 'create' ? 'green' : 'blue'}>
            <div className='flex items-center font-medium'>
              {mode === 'create' ? (
                <>
                  <BiPlus className='w-5 h-5 mr-2' />
                  <div>{t('Create')}</div>
                </>
              ) : (
                <>
                  <BiSave className='w-5 h-5 mr-2' />
                  <div>{t('Update')}</div>
                </>
              )}
            </div>
          </Button>

          <div className='px-4 py-3 rounded-md shadow bg-white'>
            <div className='mb-1 border-b'>
              <div className='mb-1'>Relation</div>
            </div>
          </div>

          <div className='px-4 py-3 rounded-md shadow bg-white'>
            <div className='mb-1 border-b'>
              <div className='mb-1'>Information</div>
            </div>
            <div className='mt-2 flex justify-between'>
              <div className='font-medium'>Created</div>
              <div>dddd</div>
            </div>
            <div className='mt-2 flex justify-between'>
              <div className='font-medium'>By</div>
              <div>dddd</div>
            </div>
            <div className='mt-2 flex justify-between'>
              <div className='font-medium'>Last update</div>
              <div>dddd</div>
            </div>
            <div className='mt-2 flex justify-between'>
              <div className='font-medium'>By</div>
              <div>dddd</div>
            </div>
          </div>

          {showDelete && (
            <Button
              className='bg-red-50 text-red-500 border-red-500 focus:ring-red-500'
              onClick={() => onDeleteData(dataEdit)}
            >
              <div className='flex items-center font-medium'>
                <BiTrashAlt className='w-5 h-5 mr-2' />
                <div>{t('Delete')}</div>
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EntityEditor

const calcAttributes = (attributesModel) =>
  attributesModel?.reduce?.((_attributes, attributeModel) => {
    const ATTRIBUTE = ATTRIBUTES[attributeModel.type]
    if (ATTRIBUTE)
      return {
        ..._attributes,
        [attributeModel.columnName]: {
          key: attributeModel.columnName,
          model: attributeModel,
          modelDefault: ATTRIBUTE.model,
          info: ATTRIBUTE.info,
        },
      }
    return _attributes
  }, {})
