import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLang, setLang } from 'redux/slices/languageSlice'
import { Dropdown } from 'ui'
import languages from 'translations/languages'

function UnAuthLayout() {
  const lang = useSelector(getLang)
  const dispatch = useDispatch()

  const handleChangeLang = (_language) => {
    dispatch(setLang(Object.keys(languages).find((lang) => languages[lang] === _language)))
  }
  return (
    <div
      className='relative w-screen h-screen flex justify-center items-center
          bg-slate-100'
    >
      <div className='absolute top-10 right-10'>
        <Dropdown
          className='shadow-none text-sm border-none'
          options={Object.values(languages)}
          value={languages[lang]}
          onChange={handleChangeLang}
        />
      </div>
      <Outlet />
    </div>
  )
}

export default UnAuthLayout
