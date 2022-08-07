const successMethods = [
  { status: 200, key: 'ok', name: 'OK' },
  { status: 201, key: 'created', name: 'Created' },
  { status: 204, key: 'deleted', name: 'Deleted' },
]

const errorMethods = [
  { status: 400, key: 'badRequest', name: 'Bad Request' },
  { status: 400, key: 'validationError', name: 'Validation Error' },
  { status: 400, key: 'paginationError', name: 'Pagination Error' },
  { status: 401, key: 'unauthorized', name: 'Unauthorized' },
  { status: 403, key: 'forbidden', name: 'Forbidden' },
  { status: 404, key: 'notFound', name: 'Not Found' },
  { status: 409, key: 'conflict', name: 'Conflict' },
  { status: 500, key: 'internalServerError', name: 'Internal Server Error' },
]

const successMethodCreator = (status) =>
  function (data, metadata) {
    return this.status(status).json({
      status,
      data,
      metadata,
    })
  }

const errorMethodCreator = (status, name) =>
  function (message, details) {
    return this.status(status).json({
      status,
      data: null,
      error: { name, message, details },
    })
  }

module.exports = (app) => {
  const responseMethods = {}
  successMethods.forEach(({ status, key, name }) => {
    responseMethods[key] = successMethodCreator(status, name)
  })
  errorMethods.forEach(({ status, key, name }) => {
    responseMethods[key] = errorMethodCreator(status, name)
  })

  Object.assign(Object.getPrototypeOf(app.response), responseMethods)
}

// const STATUSES_ALL = [
//   {
//     status: 100,
//     key: 'continue',
//     name: 'Continue',
//   },
//   {
//     status: 101,
//     key: 'switchingProtocols',
//     name: 'Switching Protocols',
//   },
//   {
//     status: 102,
//     key: 'processing',
//     name: 'Processing',
//   },
//   {
//     status: 103,
//     key: 'earlyHints',
//     name: 'Early Hints',
//   },
//   {
//     status: 200,
//     key: 'ok',
//     name: 'OK',
//   },
//   {
//     status: 201,
//     key: 'created',
//     name: 'Created',
//   },
//   {
//     status: 202,
//     key: 'accepted',
//     name: 'Accepted',
//   },
//   {
//     status: 203,
//     key: 'nonAuthoritativeInformation',
//     name: 'Non-Authoritative Information',
//   },
//   {
//     status: 204,
//     key: 'noContent',
//     name: 'No Content',
//   },
//   {
//     status: 205,
//     key: 'resetContent',
//     name: 'Reset Content',
//   },
//   {
//     status: 206,
//     key: 'partialContent',
//     name: 'Partial Content',
//   },
//   {
//     status: 207,
//     key: 'multiStatus',
//     name: 'Multi-Status',
//   },
//   {
//     status: 208,
//     key: 'alreadyReported',
//     name: 'Already Reported',
//   },
//   {
//     status: 226,
//     key: 'imUsed',
//     name: 'IM Used',
//   },
//   {
//     status: 300,
//     key: 'multipleChoices',
//     name: 'Multiple Choices',
//   },
//   {
//     status: 301,
//     key: 'movedPermanently',
//     name: 'Moved Permanently',
//   },
//   {
//     status: 302,
//     key: 'found',
//     name: 'Found',
//   },
//   {
//     status: 303,
//     key: 'seeOther',
//     name: 'See Other',
//   },
//   {
//     status: 304,
//     key: 'notModified',
//     name: 'Not Modified',
//   },
//   {
//     status: 305,
//     key: 'useProxy',
//     name: 'Use Proxy',
//   },
//   {
//     status: 307,
//     key: 'temporaryRedirect',
//     name: 'Temporary Redirect',
//   },
//   {
//     status: 308,
//     key: 'permanentRedirect',
//     name: 'Permanent Redirect',
//   },
//   {
//     status: 400,
//     key: 'badRequest',
//     name: 'Bad Request',
//   },
//   {
//     status: 401,
//     key: 'unauthorized',
//     name: 'Unauthorized',
//   },
//   {
//     status: 402,
//     key: 'paymentRequired',
//     name: 'Payment Required',
//   },
//   {
//     status: 403,
//     key: 'forbidden',
//     name: 'Forbidden',
//   },
//   {
//     status: 404,
//     key: 'notFound',
//     name: 'Not Found',
//   },
//   {
//     status: 405,
//     key: 'methodNotAllowed',
//     name: 'Method Not Allowed',
//   },
//   {
//     status: 406,
//     key: 'notAcceptable',
//     name: 'Not Acceptable',
//   },
//   {
//     status: 407,
//     key: 'proxyAuthenticationRequired',
//     name: 'Proxy Authentication Required',
//   },
//   {
//     status: 408,
//     key: 'requestTimeout',
//     name: 'Request Timeout',
//   },
//   {
//     status: 409,
//     key: 'conflict',
//     name: 'Conflict',
//   },
//   {
//     status: 410,
//     key: 'gone',
//     name: 'Gone',
//   },
//   {
//     status: 411,
//     key: 'lengthRequired',
//     name: 'Length Required',
//   },
//   {
//     status: 412,
//     key: 'preconditionFailed',
//     name: 'Precondition Failed',
//   },
//   {
//     status: 413,
//     key: 'payloadTooLarge',
//     name: 'Payload Too Large',
//   },
//   {
//     status: 414,
//     key: 'uriTooLong',
//     name: 'URI Too Long',
//   },
//   {
//     status: 415,
//     key: 'unsupportedMediaType',
//     name: 'Unsupported Media Type',
//   },
//   {
//     status: 416,
//     key: 'rangeNotSatisfiable',
//     name: 'Range Not Satisfiable',
//   },
//   {
//     status: 417,
//     key: 'expectationFailed',
//     name: 'Expectation Failed',
//   },
//   {
//     status: 418,
//     key: 'imATeapot',
//     name: "I'm a Teapot",
//   },
//   {
//     status: 421,
//     key: 'misdirectedRequest',
//     name: 'Misdirected Request',
//   },
//   {
//     status: 422,
//     key: 'unprocessableEntity',
//     name: 'Unprocessable Entity',
//   },
//   {
//     status: 423,
//     key: 'locked',
//     name: 'Locked',
//   },
//   {
//     status: 424,
//     key: 'failedDependency',
//     name: 'Failed Dependency',
//   },
//   {
//     status: 425,
//     key: 'tooEarly',
//     name: 'Too Early',
//   },
//   {
//     status: 426,
//     key: 'upgradeRequired',
//     name: 'Upgrade Required',
//   },
//   {
//     status: 428,
//     key: 'preconditionRequired',
//     name: 'Precondition Required',
//   },
//   {
//     status: 429,
//     key: 'tooManyRequests',
//     name: 'Too Many Requests',
//   },
//   {
//     status: 431,
//     key: 'requestHeaderFieldsTooLarge',
//     name: 'Request Header Fields Too Large',
//   },
//   {
//     status: 451,
//     key: 'unavailableForLegalReasons',
//     name: 'Unavailable For Legal Reasons',
//   },
//   {
//     status: 500,
//     key: 'internalServerError',
//     name: 'Internal Server Error',
//   },
//   {
//     status: 501,
//     key: 'notImplemented',
//     name: 'Not Implemented',
//   },
//   {
//     status: 502,
//     key: 'badGateway',
//     name: 'Bad Gateway',
//   },
//   {
//     status: 503,
//     key: 'serviceUnavailable',
//     name: 'Service Unavailable',
//   },
//   {
//     status: 504,
//     key: 'gatewayTimeout',
//     name: 'Gateway Timeout',
//   },
//   {
//     status: 505,
//     key: 'httpVersionNotSupported',
//     name: 'HTTP Version Not Supported',
//   },
//   {
//     status: 506,
//     key: 'variantAlsoNegotiates',
//     name: 'Variant Also Negotiates',
//   },
//   {
//     status: 507,
//     key: 'insufficientStorage',
//     name: 'Insufficient Storage',
//   },
//   {
//     status: 508,
//     key: 'loopDetected',
//     name: 'Loop Detected',
//   },
//   {
//     status: 509,
//     key: 'bandwidthLimitExceeded',
//     name: 'Bandwidth Limit Exceeded',
//   },
//   {
//     status: 510,
//     key: 'notExtended',
//     name: 'Not Extended',
//   },
//   {
//     status: 511,
//     key: 'networkAuthenticationRequired',
//     name: 'Network Authentication Required',
//   },
// ]
