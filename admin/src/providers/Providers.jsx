import React from 'react'
import PropTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store from 'redux/store'
import ThemeProvider from './ThemeProvider'
import LanguageProvider from './LanguageProvider'

const queryClient = new QueryClient()

function Providers({ children, theme, language }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <LanguageProvider language={language}>{children}</LanguageProvider>
        </ThemeProvider>
      </ReduxProvider>
    </QueryClientProvider>
  )
}

Providers.propTypes = {
  children: PropTypes.element.isRequired,
  theme: PropTypes.shape({
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    baseColor: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired,
  }).isRequired,
}

export default Providers
