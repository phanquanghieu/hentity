import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axios } from 'utils'

const initialState = {
  roles: [],
  permissions: [],
  roleEdit: { name: '', description: '', permissions: [] },
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setRoles: (state, { payload }) => {
      state.roles = payload
    },
    setPermissions: (state, { payload }) => {
      state.permissions = payload
    },
    setRoleEdit: (state, { payload }) => {
      state.roleEdit = payload
    },
    setRoleEditById: (state, { payload }) => {
      if (!payload) {
        state.roleEdit = { name: '', description: '', permissions: [] }
        return
      }
      const _roleEdit = state.roles.find((role) => role.id === parseInt(payload))
      if (_roleEdit) state.roleEdit = _roleEdit
    },
  },
})

export const getRoles = (state) => state.authorization.roles
export const getPermissions = (state) => state.authorization.permissions
export const getRoleEdit = (state) => state.authorization.roleEdit

export const { setRoles, setPermissions, setRoleEditById } = authorizationSlice.actions

export default authorizationSlice
