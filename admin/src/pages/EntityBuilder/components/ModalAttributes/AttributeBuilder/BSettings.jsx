import React from 'react'
import { useSelector } from 'react-redux'
import { getAttributeEdit } from 'redux/slices/entityBuilderSlice'
import { Controller } from 'react-hook-form'
import { useFormatMessage } from 'hooks'
import { Checkbox } from 'ui'
import { has } from 'lodash'

function BSettings({ control }) {
  const attributeEdit = useSelector(getAttributeEdit)
  const t = useFormatMessage()
  return (
    <>
      {has(attributeEdit, ['required', 'unique', 'private']) && (
        <div className='px-3 py-2 font-medium'>{t('Settings')}</div>
      )}
      <div className='pb-1 flex flex-wrap'>
        {has(attributeEdit, 'required') && (
          <div className='w-1/2 px-3'>
            <Controller
              name='required'
              defaultValue={attributeEdit.required}
              control={control}
              render={({ field }) => <Checkbox label={t('Required field')} {...field} />}
            />
          </div>
        )}
        {has(attributeEdit, 'unique') && (
          <div className='w-1/2 px-3'>
            <Controller
              name='unique'
              defaultValue={attributeEdit.unique}
              control={control}
              render={({ field }) => <Checkbox label={t('Unique field')} {...field} />}
            />
          </div>
        )}
        {has(attributeEdit, 'private') && (
          <div className='w-1/2 px-3'>
            <Controller
              name='private'
              defaultValue={attributeEdit.private}
              control={control}
              render={({ field }) => <Checkbox label={t('Private field')} {...field} />}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default BSettings
