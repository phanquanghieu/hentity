import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pickBy } from 'lodash'
import { axios } from 'utils'

const initialState = {
  entities: [],
  components: [],
  entityEdit: {},
  attributeEdit: {},
  attributeEditIndex: -1,
  showModalAttribute: false,
}

export const fetchEntities = createAsyncThunk(
  'entityBuilder/fetchEntities',
  async () =>
    (
      await axios.get('/entity_builder/entities', {
        // 'axios-retry': {
        //   retries: 1,
        //   retryDelay: () => 2000,
        //   retryCondition: () => true,
          // onRetry: () => {
          //   window.location.reload()
          // },
        // },
      })
    )?.data || []
)

const entityBuilderSlice = createSlice({
  name: 'entityBuilder',
  initialState,
  reducers: {
    setEntityEdit: (state, { payload }) => {
      state.entityEdit = payload
    },
    setEntityEditBySingularName: (state, { payload }) => {
      const _entityEdit = state.entities.find((entity) => entity.singularName === payload)
      if (_entityEdit) state.entityEdit = _entityEdit
    },
    setAttributeEdit: (state, { payload }) => {
      state.attributeEditIndex = payload.columnName
        ? state.entityEdit.attributes.findIndex(
            (attribute) => attribute.columnName === payload.columnName
          )
        : -1
      state.attributeEdit = payload
    },
    setShowModalAttribute: (state, { payload }) => {
      state.showModalAttribute = payload
    },
    saveAttributeEdit: (state, { payload }) => {
      let _attribute = { ...state.attributeEdit, ...payload }
      _attribute = pickBy(_attribute, (attr) => attr)
      if (state.attributeEditIndex === -1) {
        state.entityEdit.attributes.push(_attribute)
      } else {
        state.entityEdit.attributes[state.attributeEditIndex] = _attribute
      }
    },
    deleteAttribute: (state, { payload }) => {
      state.entityEdit.attributes = state.entityEdit.attributes.filter(
        (attribute) => attribute.columnName !== payload.columnName
      )
    },
  },

  extraReducers: {
    [fetchEntities.fulfilled]: (state, { payload }) => {
      state.entities = payload
    },
  },
})

export const getEntities = (state) => state.entityBuilder.entities
export const getComponents = (state) => state.entityBuilder.components
export const getEntityEdit = (state) => state.entityBuilder.entityEdit
export const getAttributeEdit = (state) => state.entityBuilder.attributeEdit
export const getAttributeEditIndex = (state) => state.entityBuilder.attributeEditIndex
export const getShowModalAttribute = (state) => state.entityBuilder.showModalAttribute

export const {
  setEntityEdit,
  setEntityEditBySingularName,
  setAttributeEdit,
  setShowModalAttribute,
  saveAttributeEdit,
  deleteAttribute,
} = entityBuilderSlice.actions

export default entityBuilderSlice
