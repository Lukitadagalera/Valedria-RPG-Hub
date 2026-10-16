const mongoose = require('mongoose')

const entitlementSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  expires: { type: Number, required: true, index: true },
  source: { type: String, required: true },
  plan: { type: String, required: true, default: 'contador' },
})

module.exports =
  mongoose.models.Entitlement || mongoose.model('Entitlement', entitlementSchema)
