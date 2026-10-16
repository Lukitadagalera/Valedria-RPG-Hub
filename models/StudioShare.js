const mongoose = require('mongoose')

const studioShareSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  campaignId: { type: String, required: true },
})
studioShareSchema.index({ userId: 1, campaignId: 1 }, { unique: true })

module.exports =
  mongoose.models.StudioShare || mongoose.model('StudioShare', studioShareSchema)
