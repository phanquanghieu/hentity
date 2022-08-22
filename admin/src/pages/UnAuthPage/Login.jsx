import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormatMessage } from 'hooks'
import * as yup from 'yup'
import { Button, Input } from 'ui'
import { errorTransIds, local } from 'utils'

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) })

  const navigate = useNavigate()
  const t = useFormatMessage()


  const onSubmit = (data) => {
    local.setUser({ id: 2, name: 'admin' })
    local.setJwtToken('ddddd')
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
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <div className='pb-2'>
              <Input
                type='text'
                label={t('Email', 'Email')}
                error={t(null, errors.email?.message)}
                required
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input
              type='password'
              label={t('Password', 'Password')}
              error={t(null, errors.password?.message)}
              required
              {...field}
            />
          )}
        />
        <Button type='submit' color='base' className='w-full mt-6'>
          Login
        </Button>
      </form>
      <div className='mt-6 flex justify-center items-center text-base-500'>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  )
}

const loginSchema = yup.object({
  email: yup.string().email(errorTransIds.email).required(errorTransIds.required),
  password: yup.string().required(errorTransIds.required),
})

export default Login
