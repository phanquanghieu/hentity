import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getPermissions, getRoleEdit, setRoleEditById } from 'redux/slices/authorizationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormatMessage } from 'hooks'
import { BiCheck, BiPlus, BiTrashAlt } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { Button, Checkbox, Input, Textarea } from 'ui'
import { errorTransIds, yup } from 'utils'

function Role() {
  const roleEdit = useSelector(getRoleEdit)
  const permissions = useSelector(getPermissions)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(roleSchema), mode: 'onChange' })

  const { roleId } = useParams()
  const dispatch = useDispatch()
  const t = useFormatMessage()

  useEffect(() => {
    dispatch(setRoleEditById(roleId))
  }, [roleId])

  const groupPermissions = useMemo(() => {
    let _groupPermissions = {}
    permissions.forEach((permission) => {
      let groupName = permission.action.split('.')[1]
      if (!_groupPermissions[groupName]) _groupPermissions[groupName] = []
      _groupPermissions[groupName].push(permission)
    })
    return _groupPermissions
  }, [permissions])
  console.log(roleId,roleEdit)
  const handleCreateRole = async () => {}
  const handleUpdateRole = async (data) => {
    console.log(data)
  }
  const handleDeleteRole = async () => {}

  return (
    <div className='relative h-screen overflow-scroll flex-1'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{roleId ? roleEdit.name : 'Create new Role'}</div>
        <div>
          {roleId ? (
            <>
              <Button className='mr-6' onClick={handleDeleteRole}>
                <div className='flex items-center'>
                  <BiTrashAlt className='w-5 h-5 -ml-1 mr-1' />
                  <div>{t('Delete')}</div>
                </div>
              </Button>
              <Button color='base' onClick={handleSubmit(handleUpdateRole)}>
                <div className='flex items-center'>
                  <BiCheck className='w-5 h-5 -ml-1 mr-1' />
                  <div>{t('Update')}</div>
                </div>
              </Button>
            </>
          ) : (
            <Button color='base' onClick={handleSubmit(handleUpdateRole)}>
              <div className='flex items-center'>
                <BiPlus className='w-5 h-5 -ml-1 mr-1' />
                <div>{t('Create')}</div>
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className='p-8'>
        <div className='p-3 bg-white shadow-md rounded-md'>
          <div className='px-3 pt-2 font-medium text-lg'>{t('Role Details')}</div>
          <div className='flex flex-wrap'>
            <div className='w-1/2 p-3 pb-6'>
              <Controller
                name='name'
                control={control}
                defaultValue={roleEdit.name}
                render={({ field }) => (
                  <Input
                    type='text'
                    label={t('Name')}
                    error={t(null, errors.name?.message)}
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div className='w-1/2 p-3 pb-6'>
              <Controller
                name='description'
                control={control}
                defaultValue={roleEdit.description}
                render={({ field }) => (
                  <Textarea
                    type='text'
                    label={t('Description')}
                    error={t(null, errors.description?.message)}
                    required
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className='p-3 pb-1 mt-6 bg-white shadow-md rounded-md'>
          <div className='px-3 py-2 font-medium text-lg'>{t('Permissions')}</div>
          {Object.keys(groupPermissions).map((groupPermissionKey) => (
            <div className='mx-3 mb-6 border border-base-500 rounded' key={groupPermissionKey}>
              <div className='px-3 py-1 border-b border-base-500'>{groupPermissionKey}</div>
              <div className='px-3 py-1 flex flex-wrap'>
                {groupPermissions[groupPermissionKey].map((permission) => (
                  <div className='w-1/3' key={permission.action}>
                    <Controller
                      name='permission'
                      control={control}
                      render={({ field }) => (
                        <Checkbox label={permission.name} {...field} />
                        // <Input
                        // type='text'
                        // label={t('Name')}
                        // error={t(null, errors.name?.message)}
                        // required
                        // {...field}
                        ///>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Role

const roleSchema = yup.object({
  name: yup.string().trim().required(errorTransIds.required),
  description: yup.string().trim().required(errorTransIds.required),
})
