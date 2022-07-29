import { createSlice } from '@reduxjs/toolkit'
import { local } from 'utils'

const initialState = {
  lang: 'en',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang: (state, action) => {
      const lang = action.payload
      state.lang = lang
      local.setLang(lang)
    },
  },
})

export const getLang = (state) => state.language.lang

export const { setLang } = languageSlice.actions

export default languageSlice
