import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { getLang, setLang } from 'redux/slices/languageSlice'

function LanguageProvider({ children, language }) {
  const lang = useSelector(getLang)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setLang(language.lang))
  }, [language])

  return (
    <IntlProvider locale={lang} defaultLocale='en' messages={language.translations[lang]}>
      {children}
    </IntlProvider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  language: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired,
  }).isRequired,
}

export default LanguageProvider
