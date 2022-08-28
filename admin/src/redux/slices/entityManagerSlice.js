import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axios } from 'utils'

const initialState = {
  entities: [],
  collectionEntity: {},
  singleEntity: {},
  components: [],
  query: { where: {}, page: 1, pageSize: 10 },
}

export const fetchEntities = createAsyncThunk(
  'entityManager/fetchEntities',
  async () => (await axios.get('/entity_manager/entities'))?.data || []
)

const entityManagerSlice = createSlice({
  name: 'entityManager',
  initialState,
  reducers: {
    setCollectionEntityBySingularName: (state, { payload }) => {
      const _collectionEntity = state.entities.find((entity) => entity.singularName === payload)
      if (_collectionEntity) state.collectionEntity = _collectionEntity
    },
    setCollectionEntity: (state, { payload }) => {
      state.collectionEntity = payload
    },
    setSingleEntityBySingularName: (state, { payload }) => {
      const _singleEntity = state.entities.find((entity) => entity.singularName === payload)
      if (_singleEntity) state.singleEntity = _singleEntity
    },
    setSingleEntity: (state, { payload }) => {
      state.singleEntity = payload
    },
    changeQuery: (state, { payload }) => {
      state.query = { ...state.query, ...payload }
    },
  },

  extraReducers: {
    [fetchEntities.fulfilled]: (state, { payload }) => {
      state.entities = payload
    },
  },
})

export const getEntities = (state) => state.entityManager.entities
export const getCollectionEntity = (state) => state.entityManager.collectionEntity
export const getSingleEntity = (state) => state.entityManager.singleEntity
export const getComponents = (state) => state.entityManager.components
export const getQuery = (state) => state.entityManager.query

export const {
  setCollectionEntityBySingularName,
  setCollectionEntity,
  setSingleEntityBySingularName,
  setSingleEntity,
  changeQuery,
} = entityManagerSlice.actions

export default entityManagerSlice
