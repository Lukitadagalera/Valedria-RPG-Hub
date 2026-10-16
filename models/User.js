const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    accountType: {
      type: String,
      enum: ['visitor', 'contador', 'mestre', 'deus'],
      default: 'visitor',
      required: true,
    },
    dataCriacao: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
