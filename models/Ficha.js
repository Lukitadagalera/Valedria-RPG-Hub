const mongoose = require('mongoose')

const fichaSchema = new mongoose.Schema({
  nomePersonagem: { type: String, required: true },
  raca: { type: String, enum: ['Humano', 'Elfo Sombrio', 'Anão', 'Demônio'], required: true },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.models.Ficha || mongoose.model('Ficha', fichaSchema)
