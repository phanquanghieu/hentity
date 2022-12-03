const AWS = require('aws-sdk')
const { v4 } = require('uuid')

module.exports = {
  async find(query) {
    return await hentity.query.file.findAndCountAll(query)
  },

  async create(data) {
    return await hentity.entityQuery('file').create(data)
  },

  async delete(id) {
    return await hentity.entityQuery('file').delete(id)
  },

  async upload(file) {
    try {
      const { accessKeyId, secretAccessKey, region, bucket } = h.configs.upload
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region,
      })
      const s3 = new AWS.S3()
      const url = v4()
      await s3
        .putObject({
          Bucket: bucket,
          Body: file.data,
          Key: url,
        })
        .promise()

      await this.create({ name: file.name, url: `/${url}` })
      return { url: `/${url}` }
    } catch (error) {
      console.log(error)
    }
  },
}
