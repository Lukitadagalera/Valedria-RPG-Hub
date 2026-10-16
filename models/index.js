const schemas = [
  require('./CharacterSheet'),
  require('./Entitlement'),
  require('./Audit'),
  require('./AccountPreferences'),
  require('./Profile'),
  require('./Ticket'),
  require('./StudioDocument'),
  require('./StudioShare'),
]

function createModels(connection) {
  return Object.fromEntries(
    schemas.map((model) => [
      model.modelName,
      connection.models[model.modelName] ||
        connection.model(model.modelName, model.schema),
    ]),
  )
}

module.exports = { createModels }
