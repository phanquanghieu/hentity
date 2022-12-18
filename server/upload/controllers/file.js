module.exports = {
  async find(req, res) {
    const { query } = req
    const result = await h.services.admin.upload.file.find(query)
    res.ok(result.rows, { count: result.count })
  },

  async findFileHost(req, res) {
    const file_host = h.configs.upload.fileHost
    res.ok({ file_host })
  },

  async upload(req, res) {
    const file = req.files?.file
    if (!file) return res.invalidParams("Missing 'file' file")
    const result = await h.services.admin.upload.file.upload(file)
    res.ok(result)
  },

  async delete(req, res) {
    const { id } = req.params
    const result = await h.services.admin.upload.file.delete(id)
    res.ok(result)
  },
}
