const { camelCase, kebabCase, snakeCase } = require('lodash')
const slugify = require('slugify')

const isCamelCase = (val) => val === camelCase(slugify(val))
const isKebabCase = (val) => val === kebabCase(slugify(val))
const isSnakeCase = (val) => val === snakeCase(slugify(val))
const toCamelCase = (val) => camelCase(slugify(val))
const toKebabCase = (val) => kebabCase(slugify(val))
const toSnakeCase = (val) => snakeCase(slugify(val))

module.exports = { isCamelCase, isKebabCase, isSnakeCase, toCamelCase, toKebabCase, toSnakeCase }
