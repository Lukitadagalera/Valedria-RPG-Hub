const mongoose = require('mongoose')

const accountPreferencesSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
})

module.exports =
  mongoose.models.AccountPreferences ||
  mongoose.model('AccountPreferences', accountPreferencesSchema)
