const mongoose = require('mongoose')

const auditSchema = new mongoose.Schema({
  at: { type: Number, required: true },
  event: { type: String, required: true },
  userId: { type: String, default: null },
})

module.exports = mongoose.models.Audit || mongoose.model('Audit', auditSchema)
