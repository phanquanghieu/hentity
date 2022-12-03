module.exports = {
  accessKeyId: process.env.ACCESS_KEY_ID || 'AKIA4YK2YRBWBJKMJMXY',
  secretAccessKey: process.env.SECRET_ACCESS_KEY || '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',
  region: process.env.REGION || 'ap-northeast-1',
  bucket: process.env.BUCKET || 's3-hentity-test',
  fileHost: process.env.FILE_HOST || 'https://s3-hentity-test.s3.ap-northeast-1.amazonaws.com',
}
