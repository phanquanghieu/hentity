import { configureStore } from '@reduxjs/toolkit'

import entityBuilderSlice from './slices/entityBuilderSlice'
import entityManagerSlice from './slices/entityManagerSlice'
import languageSlice from './slices/languageSlice'
import authorizationSlice from './slices/authorizationSlice'
import themeSlice from './slices/themeSlice'

const store = configureStore({
  reducer: {
    entityBuilder: entityBuilderSlice.reducer,
    entityManager: entityManagerSlice.reducer,
    language: languageSlice.reducer,
    authorization: authorizationSlice.reducer,
    theme: themeSlice.reducer,
  },
})

export default store
