import { isObject } from 'lodash'

const JWT_TOKEN = 'jwtToken'
const USER = 'user'
const THEME = 'theme'
const LANG = 'lang'

const local = {
  getS(key) {
    const data = sessionStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  },
  setL(key, val) {
    if (isObject(val)) val = JSON.stringify(val)
    localStorage.setItem(key, val)
  },
  clearL() {
    sessionStorage.clear()
  },

  getL(key) {
    const data = localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  },
  setS(key, val) {
    if (isObject(val)) val = JSON.stringify(val)
    sessionStorage.setItem(key, val)
  },
  clearS() {
    localStorage.clear()
  },

  getJwtToken() {
    return this.getL(JWT_TOKEN)
  },
  setJwtToken(val) {
    this.setL(JWT_TOKEN, val)
  },

  getUser() {
    return this.getL(USER)
  },
  setUser(val) {
    this.setL(USER, val)
  },

  getTheme() {
    return this.getL(THEME)
  },
  setTheme(val) {
    this.setL(THEME, val)
  },

  getLang() {
    return this.getL(LANG)
  },
  setLang(val) {
    this.setL(LANG, val)
  },
}

export default local
