import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPermissions, getRoleEdit, setRoleEditById } from 'redux/slices/authorizationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormatMessage } from 'hooks'
import { BiCheck, BiPlus, BiTrashAlt } from 'react-icons/bi'
import { Button, Checkbox, Input, Textarea } from 'ui'
import { axios, errorTransIds, yup } from 'utils'
import { toast } from 'react-toastify'
import { isArray } from 'lodash'

function Role() {
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const roleEdit = useSelector(getRoleEdit)
  const permissions = useSelector(getPermissions)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(roleSchema), mode: 'onChange' })

  const { roleId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const t = useFormatMessage()

  useEffect(() => {
    dispatch(setRoleEditById(roleId))
  }, [roleId])

  useEffect(() => {
    setValue('name', roleEdit.name)
    setValue('description', roleEdit.description)
    setSelectedPermissions([...roleEdit.permissions.map((permission) => permission.id)])
  }, [roleEdit])

  const groupPermissions = useMemo(() => {
    let _groupPermissions = {}
    permissions.forEach((permission) => {
      let groupName = permission.action.split('.')[1]
      if (!_groupPermissions[groupName]) _groupPermissions[groupName] = []
      _groupPermissions[groupName].push(permission)
    })
    return _groupPermissions
  }, [permissions])

  const handleCreateRole = async (data) => {
    let _role = { ...data, permissions: selectedPermissions }
    let res = await axios.post(`/auth/roles`, _role)
    if (res.error) return toast.error('Create error!')
    toast.success('Create success!')
    navigate(`/authorization`)
    window.location.reload()
  }
  const handleUpdateRole = async (data) => {
    let _role = { ...data, permissions: selectedPermissions }
    let res = await axios.put(`/auth/roles/${roleEdit.id}`, _role)
    if (res.error) return toast.error('Update error!')
    toast.success('Update success!')
  }
  const handleDeleteRole = async (roleId) => {
    let res = await axios.delete(`/auth/roles/${roleId}`)
    if (res.error) return toast.error('Delete error!')
    toast.success('Delete success!')
    navigate(`/authorization`)
    window.location.reload()
  }

  const handleSelectPermission = (permissionIds) => {
    if (isArray(permissionIds)) {
      if (permissionIds.every((permissionId) => selectedPermissions.includes(permissionId))) {
        setSelectedPermissions(selectedPermissions.filter((item) => !permissionIds.includes(item)))
      } else setSelectedPermissions([...selectedPermissions, ...permissionIds])
    } else {
      if (selectedPermissions.includes(permissionIds)) {
        setSelectedPermissions(selectedPermissions.filter((item) => item !== permissionIds))
      } else setSelectedPermissions([...selectedPermissions, permissionIds])
    }
  }

  return (
    <div className='relative h-screen overflow-scroll flex-1'>
      <div className='sticky top-0 z-10 min-h-[4rem] px-6 shadow-md bg-white flex justify-between items-center'>
        <div className='font-bold text-2xl'>{roleId ? roleEdit.name : 'Create new Role'}</div>
        <div>
          {roleId ? (
            <>
              <Button className='mr-6' onClick={() => handleDeleteRole(roleId)}>
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
            <Button color='base' onClick={handleSubmit(handleCreateRole)}>
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
              <div className='px-3 py-0.5 w-full rounded-t border-b border-base-500 bg-base-50 flex justify-between items-center'>
                <div className=' font-medium'>{groupPermissionKey}</div>
                <div>
                  <Checkbox
                    label={'Select All'}
                    value={groupPermissions[groupPermissionKey]
                      .map((permission) => permission.id)
                      .every((permissionId) => selectedPermissions.includes(permissionId))}
                    onChange={() => {
                      handleSelectPermission(
                        groupPermissions[groupPermissionKey].map((permission) => permission.id)
                      )
                    }}
                  />
                </div>
              </div>
              <div className='px-1 py-1 flex flex-wrap'>
                {groupPermissions[groupPermissionKey].map((permission) => (
                  <div
                    className='w-full px-2 rounded flex hover:bg-base-100'
                    key={permission.action}
                  >
                    <div className='w-1/3 cursor-pointer' key={permission.action}>
                      <Checkbox
                        label={permission.name}
                        value={selectedPermissions.includes(permission.id)}
                        onChange={() => {
                          handleSelectPermission(permission.id)
                        }}
                      />
                    </div>
                    <div className='w-2/3 flex items-center'>
                      <div
                        className={`w-16 rounded text-white text-sm ${
                          METHOD_COLOR[permission.method]
                        } font-semibold flex justify-center`}
                      >
                        {permission.method}
                      </div>
                      <div className='w-3 ml-5'>{calcUrl(permission.path)}</div>
                    </div>
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

const calcUrl = (path) => `${process.env.BACKEND_URL}/api${path}`

const roleSchema = yup.object({
  name: yup.string().trim().required(errorTransIds.required),
  description: yup.string().trim().required(errorTransIds.required),
})

const METHOD_COLOR = {
  GET: 'bg-emerald-500',
  POST: 'bg-amber-500',
  PUT: 'bg-blue-500',
  DELETE: 'bg-red-500',
}
