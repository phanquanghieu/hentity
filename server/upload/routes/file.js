module.exports = {
  find: {
    method: 'GET',
    path: '/upload/files',
    handler: 'admin.upload.file.find',
    middlewares: [],
  },

  fileHost: {
    method: 'GET',
    path: '/upload/host',
    handler: 'admin.upload.file.findFileHost',
    middlewares: [],
    type: 'api',
    authStrategy: false,
  },

  upload: {
    method: 'POST',
    path: '/upload/files',
    handler: 'admin.upload.file.upload',
    middlewares: [],
    type: 'api',
    authStrategy: false,
  },

  fileHostAdmin: {
    method: 'GET',
    path: '/upload/host',
    handler: 'admin.upload.file.findFileHost',
    middlewares: [],
  },

  uploadAdmin: {
    method: 'POST',
    path: '/upload/files',
    handler: 'admin.upload.file.upload',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/upload/files/:id',
    handler: 'admin.upload.file.delete',
    middlewares: [],
  },
}
