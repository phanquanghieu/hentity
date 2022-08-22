import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormatMessage } from 'hooks'
import { upperFirst } from 'lodash'
import { BiCheck } from 'react-icons/bi'
import { plural, singular } from 'pluralize'
import { Button, Input, Radio } from 'ui'
import { errorTransIds, string, yup } from 'utils'
import { setEntityEdit } from 'redux/slices/entityBuilderSlice'
import { useDispatch } from 'react-redux'

function CreateEntity() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(entitySchema), mode: 'onChange' })

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const t = useFormatMessage()

  useEffect(() => {
    const entityType = location.state?.entityType || 'collection'
    setValue('type', entityType)
  }, [location])

  const onSubmit = (data) => {
    const _entityEdit = { ...ENTITY, ...data, tableName: string.toSnakeCase(data.pluralName) }
    dispatch(setEntityEdit(_entityEdit))
    navigate(`/entity_builder/entity/${_entityEdit.singularName}`)
  }

  const type = watch('type')
  return (
    <div className='relative h-screen overflow-auto flex-1'>
      <div className='sticky top-0 min-h-[4rem] px-5 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{t(`Create ${upperFirst(type)}`)}</div>
        <Button onClick={handleSubmit(onSubmit)} color='base'>
          <div className='flex items-center'>
            <BiCheck className='w-5 h-5 -ml-1 mr-1' />
            <div>{t('Create')}</div>
          </div>
        </Button>
      </div>
      <div className='p-10'>
        <div className='p-10 shadow-md rounded-md bg-white'>
          <div className='flex flex-wrap'>
            <div className='w-1/2 p-3'>
              <Controller
                name='displayName'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    label={t('Display name')}
                    error={t(null, errors.displayName?.message)}
                    required
                    {...field}
                    onChange={(e) => {
                      const value = string.toSnakeCase(e.target.value)
                      setValue('singularName', string.toSnakeCase(singular(value)),{
                        shouldValidate: true,
                      })
                      setValue('pluralName', string.toSnakeCase(plural(value)),{
                        shouldValidate: true,
                      })
                      field.onChange(e)
                    }}
                  />
                )}
              />
            </div>
            <div className='w-1/2 p-3' />
            <div className='w-1/2 p-3'>
              <Controller
                name='singularName'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    label={t('UID (Singular)')}
                    error={t(null, errors.singularName?.message)}
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div className='w-1/2 p-3'>
              <Controller
                name='pluralName'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    label={t('UID (Plural)')}
                    error={t(null, errors.pluralName?.message)}
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div className='w-full p-3'>
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <Radio
                    className='flex flex-wrap space-x-6'
                    label={t('Type')}
                    options={[
                      { label: 'Collection', value: 'collection' },
                      { label: 'Single', value: 'single' },
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEntity

const entitySchema = yup.object({
  displayName: yup.string().trim().required(errorTransIds.required),
  singularName: yup.string().trim().required(errorTransIds.required).isSnakeCase(),
  pluralName: yup.string().trim().required(errorTransIds.required).isSnakeCase(),
})

const ENTITY = {
  type: 'collection',
  tableName: '',
  singularName: '',
  pluralName: '',
  displayName: '',
  attributes: [],
  // name: {
  //   type: 'string',
  // },
  // category: {
  //   type: 'relation',
  //   relation: 'manyToOne',
  //   target: 'api::category.category',
  //   inversedBy: 'books',
  // },
}
