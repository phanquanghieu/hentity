import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormatMessage } from 'hooks'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, Input } from 'ui'
import { axios, errorTransIds, local } from 'utils'

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) })

  const navigate = useNavigate()
  const t = useFormatMessage()

  const onSubmit = async (data) => {
    let res = await axios.post(`/login`, data)
    if (res?.data?.error) return toast.error(res.data.message)
    local.setJwtToken(res.data.token)
    toast.success('Login success!')
    navigate('/')
  }
  return (
    <div className='w-[500px] px-14 py-14 rounded-md shadow-md bg-white'>
      <div className='mb-1 flex justify-center items-center font-bold text-3xl text-slate-700'>
        Welcome to Hentity!
      </div>
      <div className='mb-12 flex justify-center items-center text-slate-700'>
        Login to your Hentity account
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='pb-8'>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input
                type='text'
                label={t('Username', 'Username')}
                error={t(null, errors.username?.message)}
                required
                placeholder={'admin'}
                {...field}
              />
            )}
          />
        </div>
        <div className='pb-6'>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                type='password'
                label={t('Password', 'Password')}
                error={t(null, errors.password?.message)}
                required
                placeholder={'admin'}
                {...field}
              />
            )}
          />
        </div>
        <Button type='submit' color='base' className='w-full mt-6'>
          Login
        </Button>
      </form>
    </div>
  )
}

const loginSchema = yup.object({
  username: yup.string().required(errorTransIds.required),
  password: yup.string().required(errorTransIds.required),
})

export default Login
