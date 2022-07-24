/* eslint-disable arrow-body-style */
import languages from './languages'

export default async () => {
  const importPromises = Object.keys(languages).map((lang) => {
    return import(`./${lang}.json`)
      .then(({ default: data }) => {
        return { data, lang }
      })
      .catch(() => {
        return { data: null, lang }
      })
  })

  const translations = await Promise.all(importPromises)

  return translations.reduce((acc, current) => {
    if (current.data) acc[current.lang] = current.data

    return acc
  }, {})
}
