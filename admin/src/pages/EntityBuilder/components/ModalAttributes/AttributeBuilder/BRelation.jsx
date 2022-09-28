import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAttributeEdit,
  getCollectionEntities,
  getEntityEdit,
  setShowModalAttribute,
} from 'redux/slices/entityBuilderSlice'
import { Controller } from 'react-hook-form'
import { useFormatMessage } from 'hooks'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { string } from 'utils'
import { Dropdown, Input } from 'ui'
import RelationIcons from 'components/Icons/RelationIcons'

function BRelation({ control, errors, setValue, getValues, watch }) {
  const attributeEdit = useSelector(getAttributeEdit)
  const entityEdit = useSelector(getEntityEdit)
  const collectionEntities = useSelector(getCollectionEntities)
  const referenceEntities =
    collectionEntities.filter((entity) => entity.singularName !== entityEdit.singularName) || []

  const t = useFormatMessage()
  const dispatch = useDispatch()

  useEffect(() => {
    const referenceEntity = referenceEntities[0]
    if (!referenceEntity) {
      toast.warn('There is only one Entity. Create more!!!')
      dispatch(setShowModalAttribute(false))
      return
    }

    if (attributeEdit.reference) return
    console.log(attributeEdit.reference, referenceEntity)
    setValue('reference', referenceEntity.singularName)
    calcRelation(setValue, entityEdit, referenceEntity, 'oneToOne')
  }, [attributeEdit])

  const relationSelected = watch('relation') || attributeEdit.relation
  return (
    <div className='p-3 flex justify-between'>
      <div className='w-48 shadow rounded border border-base-300 bg-base-50'>
        <div className='h-10 border-b border-base-300 font-medium flex justify-center items-center'>
          {entityEdit.displayName}
        </div>
        <div className='px-3 pt-2'>
          <div className='pb-6'>
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
          <div className='pb-6'>
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
        </div>
      </div>
      <div className='flex-1'>
        <div className='h-[3px] mt-20 w-full bg-base-500'></div>
        <div className='relative px-10 flex justify-center'>
          <Controller
            name='relation'
            defaultValue={attributeEdit.relation}
            control={control}
            render={({ field }) => (
              <div className='absolute -top-6 space-x-6 flex'>
                {Object.values(RELATIONS).map((RELATION) => (
                  <div
                    key={RELATION.key}
                    className={twMerge(
                      classNames(
                        `w-12 h-12 rounded shadow border bg-white flex justify-center items-center
                      text-slate-600 hover:shadow-md hover:border-base-500 cursor-pointer transition`,
                        {
                          'text-base-600 border-base-600 outline-none ring-2 ring-offset-2 ring-base-600':
                            field.value === RELATION.key,
                        }
                      )
                    )}
                    onClick={() => {
                      field.onChange(RELATION.key)
                      const referenceEntity = referenceEntities.find(
                        (referenceEntity) => referenceEntity.singularName === getValues('reference')
                      )
                      calcRelation(setValue, entityEdit, referenceEntity, RELATION.key)
                    }}
                  >
                    <RELATION.icon className='w-8 h-8' />
                  </div>
                ))}
              </div>
            )}
          />
        </div>
        <div className='pt-14 flex justify-center'>
          <div>{RELATIONS[relationSelected]?.label}</div>
        </div>
      </div>
      <div className='w-48 shadow rounded border border-base-300 bg-base-50'>
        <div className='h-10 border-b border-base-300 font-medium flex justify-center items-center'>
          <Controller
            name='reference'
            defaultValue={attributeEdit.reference}
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                className='shadow-none border-none font-medium'
                options={referenceEntities.map((referenceEntity) => referenceEntity.displayName)}
                value={
                  referenceEntities.find(
                    (referenceEntity) => referenceEntity.singularName === field.value
                  )?.displayName
                }
                onChange={(_reference) => {
                  const referenceEntity = referenceEntities.find(
                    (referenceEntity) => referenceEntity.displayName === _reference
                  )
                  field.onChange(referenceEntity.singularName)
                  calcRelation(setValue, entityEdit, referenceEntity, getValues('relation'))
                }}
              />
            )}
          />
        </div>
        <div className='px-3 pt-2'>
          <div className='pb-6'>
            <Controller
              name='referenceDisplayName'
              defaultValue={attributeEdit.referenceDisplayName}
              control={control}
              render={({ field }) => (
                <Input
                  label={t('Name')}
                  error={t(null, errors.referenceDisplayName?.message)}
                  required
                  {...field}
                  onChange={(e) => {
                    setValue('referenceColumnName', string.toSnakeCase(e.target.value), {
                      shouldValidate: true,
                    })
                    field.onChange(e)
                  }}
                />
              )}
            />
          </div>
          <div className='pb-6'>
            <Controller
              name='referenceColumnName'
              defaultValue={attributeEdit.referenceColumnName}
              control={control}
              render={({ field }) => (
                <Input
                  label={t('Column Name')}
                  error={t(null, errors.referenceColumnName?.message)}
                  required
                  {...field}
                  onBlur={(e) => {
                    setValue('referenceColumnName', string.toSnakeCase(e.target.value))
                    field.onBlur(e)
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BRelation

const RELATIONS = {
  oneToOne: {
    key: 'oneToOne',
    association: 'hasOne',
    label: 'One to One relationship',
    icon: RelationIcons.IconOneToOne,
  },
  oneToMany: {
    key: 'oneToMany',
    association: 'hasMany',
    label: 'One to Many relationship',
    icon: RelationIcons.IconOneToMany,
  },
  manyToMany: {
    key: 'manyToMany',
    association: 'belongsToMany',
    label: 'Many to Many relationship',
    icon: RelationIcons.IconManyToMany,
  },
}

const calcRelation = (setValue, entity, referenceEntity, relation) => {
  let result = {}
  if (relation === 'oneToOne')
    result = {
      association: 'hasOne',
      columnName: referenceEntity.singularName,
      displayName: referenceEntity.singularName,
      referenceColumnName: entity.singularName,
      referenceDisplayName: entity.singularName,
    }
  if (relation === 'oneToMany')
    result = {
      association: 'hasMany',
      columnName: referenceEntity.pluralName,
      displayName: referenceEntity.pluralName,
      referenceColumnName: entity.singularName,
      referenceDisplayName: entity.singularName,
    }
  if (relation === 'manyToMany')
    result = {
      association: 'belongsToMany',
      columnName: referenceEntity.pluralName,
      displayName: referenceEntity.pluralName,
      referenceColumnName: entity.pluralName,
      referenceDisplayName: entity.pluralName,
    }
  setValue('association', result.association)
  setValue('columnName', result.columnName)
  setValue('displayName', result.displayName)
  setValue('referenceColumnName', result.referenceColumnName)
  setValue('referenceDisplayName', result.referenceDisplayName)
}
