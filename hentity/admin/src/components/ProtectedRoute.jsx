import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { local } from 'utils'

function ProtectedRoute({ children }) {
  const jwtToken = local.getJwtToken()

  if (!jwtToken) return <Navigate to='/auth' />
  return children
}

ProtectedRoute.propTypes = { children: PropTypes.element.isRequired }

export default ProtectedRoute
