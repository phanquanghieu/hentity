module.exports = {
  async find(query) {
    return await hentity.entityQuery('permission').find(query)
  },
}
