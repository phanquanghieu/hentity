import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setTheme } from 'redux/slices/themeSlice'
import { Loader } from 'ui'

function ThemeProvider({ children, theme }) {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTheme(theme))
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className='w-screen h-screen'>
        <Loader />
      </div>
    )
  }

  return children
}

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
  theme: PropTypes.shape({
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    baseColor: PropTypes.string.isRequired,
  }).isRequired,
}

export default ThemeProvider
