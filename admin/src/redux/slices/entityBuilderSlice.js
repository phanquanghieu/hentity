import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collections: [],
  singles: [],
  components: [],
  entityEdit: {},
  attributeEdit: {},
}

const entityBuilderSlice = createSlice({
  name: 'entityBuilder',
  initialState,
  reducers: {
    setCollections: (state, action) => (state.collections = action.payload),
    setSingles: (state, action) => (state.singles = action.payload),
    setComponents: (state, action) => (state.components = action.payload),
    setEntityEdit: (state, action) => (state.entityEdit = action.payload),
    setAttributeEdit: (state, action) => (state.attributeEdit = action.payload),
  },
})

export const getCollections = (state) => state.entityBuilder.collections
export const getSingles = (state) => state.entityBuilder.singles
export const getComponents = (state) => state.entityBuilder.components
export const getEntityEdit = (state) => state.entityBuilder.entityEdit
export const getAttributeEdit = (state) => state.entityBuilder.attributeEdit

export const { setCollections, setSingles, setComponents, setEntityEdit, setAttributeEdit } =
  entityBuilderSlice.actions

export default entityBuilderSlice
