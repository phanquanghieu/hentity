import { configureStore } from '@reduxjs/toolkit'

import entityBuilderSlice from './slices/entityBuilderSlice'
import entityManagerSlice from './slices/entityManagerSlice'
import themeSlice from './slices/themeSlice'
import languageSlice from './slices/languageSlice'

const store = configureStore({
  reducer: {
    entityBuilder: entityBuilderSlice.reducer,
    entityManager: entityManagerSlice.reducer,
    theme: themeSlice.reducer,
    language: languageSlice.reducer,
  },
})

export default store
