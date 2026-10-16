const mongoose = require('mongoose')

const studioDocumentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  kind: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  version: { type: Number, required: true },
})
studioDocumentSchema.index({ userId: 1, kind: 1 }, { unique: true })

module.exports =
  mongoose.models.StudioDocument || mongoose.model('StudioDocument', studioDocumentSchema)
