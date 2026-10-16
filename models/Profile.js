const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  locale: { type: String, default: '' },
})

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema)
