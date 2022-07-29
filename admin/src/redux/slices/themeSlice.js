import { createSlice } from '@reduxjs/toolkit'
import { local } from 'utils'
import colors from 'configs/colors'

const initialState = {
  mode: 'light',
  baseColor: 'emerald',
}

const applyThemeMode = (mode) => {
  if (mode === 'dark') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

const applyBaseColor = (baseColor) => {
  const color = colors[baseColor] || colors.emerald
  Object.keys(color).forEach((tone) => {
    document.body.style.setProperty(`--base-color-${tone}`, color[tone])
  })
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const { mode, baseColor } = action.payload
      state.mode = mode
      state.baseColor = baseColor

      applyThemeMode(mode)
      applyBaseColor(baseColor)
      local.setTheme(state)
    },
    setBaseColor: (state, action) => {
      const baseColor = action.payload
      state.baseColor = baseColor

      applyBaseColor(baseColor)
      local.setTheme(state)
    },
    switchMode: (state) => {
      const mode = state.mode === 'light' ? 'dark' : 'light'
      state.mode = mode

      applyThemeMode(mode)
      local.setTheme(state)
    },
  },
})

export const getMode = (state) => state.theme.mode
export const getBaseColor = (state) => state.theme.baseColor

export const { setTheme, setBaseColor, switchMode } = themeSlice.actions

export default themeSlice
