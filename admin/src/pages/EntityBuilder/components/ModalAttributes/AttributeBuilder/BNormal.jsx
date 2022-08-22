import React from 'react'
import {  useSelector } from 'react-redux'
import { getAttributeEdit } from 'redux/slices/entityBuilderSlice'
import { Controller } from 'react-hook-form'
import { useFormatMessage } from 'hooks'
import { Input, Textarea } from 'ui'
import { string } from 'utils'
import { has } from 'lodash'
import InputBase from 'components/InputBase'
import { ATTRIBUTES } from 'constant/attributes'

function BNormal({ control, errors, setValue }) {
  const attributeEdit = useSelector(getAttributeEdit)
  const t = useFormatMessage()

  const ATTRIBUTE = ATTRIBUTES[attributeEdit.type]
  return (
    <div className='flex flex-wrap'>
      <div className='w-1/2 px-3 pt-2'>
        <Controller
          name='displayName'
          defaultValue={attributeEdit.displayName}
          control={control}
          render={({ field }) => (
            <Input
              label={t('Name')}
              error={t(null, errors.displayName?.message)}
              required
              {...field}
              onChange={(e) => {
                setValue('columnName', string.toSnakeCase(e.target.value), {
                  shouldValidate: true,
                })
                field.onChange(e)
              }}
            />
          )}
        />
      </div>
      <div className='w-1/2 px-3 pt-2'>
        <Controller
          name='columnName'
          defaultValue={attributeEdit.columnName}
          control={control}
          render={({ field }) => (
            <Input
              label={t('Column Name')}
              error={t(null, errors.columnName?.message)}
              required
              {...field}
              onBlur={(e) => {
                setValue('columnName', string.toSnakeCase(e.target.value))
                field.onBlur(e)
              }}
            />
          )}
        />
      </div>
      {has(attributeEdit, 'enum') && (
        <div className='w-1/2 px-3 pt-2'>
          <Controller
            name='enum'
            defaultValue={attributeEdit.enum}
            control={control}
            render={({ field }) => (
              <Textarea
                label={t('Enum Value')}
                error={t(null, errors.enum?.message)}
                required
                rows='4'
                {...field}
                onChange={(e) => field.onChange(e.target.value.split(/\n/g) || [])}
                value={field.value.join('\n')}
              />
            )}
          />
        </div>
      )}
      {has(attributeEdit, 'defaultValue') && (
        <div className='w-1/2 px-3 pt-2'>
          <Controller
            name='defaultValue'
            defaultValue={attributeEdit.defaultValue || ''}
            control={control}
            render={({ field }) => (
              <InputBase
                label={t('Default Value')}
                inputWidget={ATTRIBUTE.info.inputWidget}
                inputWidgetType={ATTRIBUTE.info.inputWidgetType}
                {...field}
                onChange={(e) =>
                  field.onChange(
                    ATTRIBUTE.info.inputWidgetType === 'number' ? Number(e.target.value) : e
                  )
                }
              />
            )}
          />
        </div>
      )}
    </div>
  )
}

export default React.memo(BNormal)
