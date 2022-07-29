import React from 'react'
import Providers from 'providers'
import getTranslations from 'translations'
import { local } from 'utils'
import RootRouter from 'RootRouter'

class HentityAdmin {
  constructor() {
    this.theme = {
      mode: 'light',
      baseColor: 'emerald',
    }
    this.language = {
      lang: 'en',
      translations: {},
    }
  }

  async init() {
    const theme = local.getTheme()
    if (theme) this.theme = theme

    const lang = local.getLang()
    if (lang) this.language.lang = lang
    this.language.translations = await getTranslations()
  }

  render() {
    return (
      <Providers theme={this.theme} language={this.language}>
        <RootRouter />
      </Providers>
    )
  }
}

export default () => new HentityAdmin()
