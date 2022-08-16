import { configureStore } from '@reduxjs/toolkit'

import entityBuilderSlice from './slices/entityBuilderSlice'
import themeSlice from './slices/themeSlice'
import languageSlice from './slices/languageSlice'

const store = configureStore({
  reducer: {
    entityBuilder: entityBuilderSlice.reducer,
    theme: themeSlice.reducer,
    language: languageSlice.reducer,
  },
})

export default store
