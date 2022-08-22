const dataCreator = {
  routes: require('./routeCreator'),
  controllers: require('./controllerCreator'),
  services: require('./serviceCreator'),
  entities: require('./entityCreator'),
}
module.exports = (folderName, entity) => {
  return dataCreator[folderName](entity)
}
