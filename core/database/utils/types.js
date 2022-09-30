const KEY_TYPES = [
  'password',
  'email',
  'string',
  'richtext',
  'text',
  'json',
  'enum',
  'integer',
  'biginteger',
  'float',
  'decimal',
  'date',
  'time',
  'datetime',
  'boolean',
]
const KEY_NORMAL_TYPES = [
  'password',
  'email',
  'string',
  'richtext',
  'text',
  'json',
  'enum',
  'integer',
  'biginteger',
  'float',
  'decimal',
  'date',
  'time',
  'datetime',
  'boolean',
]
const KEY_STRING_TYPES = ['string', 'text', 'email', 'enum', 'richtext']
const KEY_NUMBER_TYPES = ['biginteger', 'integer', 'decimal', 'float']

const TYPE_SCHEMAS = {
  password: { type: 'password', required: false, default: null, unique: false },
  email: { type: 'email', required: false, default: null, unique: false },
  string: { type: 'string', required: false, default: null, unique: false },
  richtext: { type: 'richtext', required: false, default: null, unique: false },
  text: { type: 'text', required: false, default: null, unique: false },
  json: { type: 'json', required: false, default: null, unique: false },
  enum: { type: 'enum', required: false, default: null, unique: false },
  integer: { type: 'integer', required: false, default: null, unique: false },
  biginteger: { type: 'biginteger', required: false, default: null, unique: false },
  float: { type: 'float', required: false, default: null, unique: false },
  decimal: { type: 'decimal', required: false, default: null, unique: false },
  date: { type: 'date', required: false, default: null, unique: false },
  time: { type: 'time', required: false, default: null, unique: false },
  datetime: { type: 'datetime', required: false, default: null, unique: false },
  boolean: { type: 'boolean', required: false, default: null, unique: false },
}

module.exports = {
  isNormal: (type) => KEY_NORMAL_TYPES.includes(type),
  isString: (type) => KEY_STRING_TYPES.includes(type),
  isNumber: (type) => KEY_NUMBER_TYPES.includes(type),
}
