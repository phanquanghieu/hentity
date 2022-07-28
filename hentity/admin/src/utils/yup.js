import * as yup from 'yup'
import string from './string'

function isCamelCase(message = '${path} is not in camel case (anExampleOfCamelCase)') {
  return this.test('is in camelCase', message, (value) => string.isCamelCase(value))
}

function isKebabCase(message = '${path} is not in kebab case (an-example-of-kebab-case)') {
  return this.test('is in kebab-case', message, (value) => string.isKebabCase(value))
}
function isSnakeCase(message = '${path} is not in snake case (an_example_of_snake_case)') {
  return this.test('is in snake_case', message, (value) => string.isSnakeCase(value))
}

yup.addMethod(yup.string, 'isCamelCase', isCamelCase)
yup.addMethod(yup.string, 'isKebabCase', isKebabCase)
yup.addMethod(yup.string, 'isSnakeCase', isSnakeCase)

export default yup
