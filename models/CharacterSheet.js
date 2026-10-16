const mongoose = require('mongoose')
const { Schema } = mongoose

const fichaCatalogEntrySchema = new Schema(
  {
    nome: { type: String, required: true, maxlength: 300 },
    atributo: String,
    categoria: String,
    preco: String,
    descricao: String,
    grau: String,
    tipo: String,
    efeito: String,
    condicao_de_uso: String,
    maldicao: String,
    quantidade: { type: Number, min: 1, max: 999 },
  },
  { _id: false, strict: false },
)

const characterSheetSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    nome: { type: String, default: '', maxlength: 300 },
    jogador: { type: String, default: '', maxlength: 300 },
    raca: { type: String, default: '' },
    subraca: { type: String, default: '' },
    papel: { type: String, default: '' },
    nivel: { type: Number, min: 1, max: 10, default: 1, validate: Number.isInteger },
    vidaAtual: { type: Number, min: 0, default: 0, validate: Number.isInteger },
    caminho: { type: String, enum: ['', 'Magia', 'Aura'], default: '' },
    manaPotencial: {
      type: String,
      enum: ['Estagnada', 'Comum', 'Elevado', 'Superior', 'Anomalia de Mana'],
      default: 'Comum',
    },
    manaAtual: { type: Number, min: 0, default: 50, validate: Number.isInteger },
    auraGrau: {
      type: String,
      enum: ['Aprendiz', 'Guerreiro', 'Mestre', 'Grande Mestre', 'Imperador', 'Deus'],
      default: 'Aprendiz',
    },
    auraAtual: { type: Number, min: 0, default: 3, validate: Number.isInteger },
    auraCaminho: { type: String, enum: ['', 'Força', 'Velocidade', 'Morte', 'Técnica'], default: '' },
    armadura: { type: String, enum: ['nenhuma', 'leve', 'media', 'pesada'], default: 'nenhuma' },
    escudo: { type: String, enum: ['nao', 'sim'], default: 'nao' },
    versao: { type: Number, min: 1, max: 6, default: 6, validate: Number.isInteger },
    papelTeste: { type: Schema.Types.Mixed, default: null },
    papelUsado: { type: Boolean, default: false },
    atributos: {
      forca: { type: Number, min: 1, default: 1, validate: Number.isInteger },
      destreza: { type: Number, min: 1, default: 1, validate: Number.isInteger },
      constituicao: { type: Number, min: 1, default: 1, validate: Number.isInteger },
      sabedoria: { type: Number, min: 1, default: 1, validate: Number.isInteger },
      carisma: { type: Number, min: 1, default: 1, validate: Number.isInteger },
    },
    pericias: { type: [fichaCatalogEntrySchema], default: [] },
    itens: { type: [fichaCatalogEntrySchema], default: [] },
    artefatos: { type: [fichaCatalogEntrySchema], default: [] },
    foto: { type: String, default: '' },
    fotoOriginal: { type: String, default: '' },
    fotoRecorte: { type: Schema.Types.Mixed, default: null },
    montariaId: { type: String, default: '' },
    montaria: { type: String, default: '' },
    montariaOriginal: { type: String, default: '' },
    montariaRecorte: { type: Schema.Types.Mixed, default: null },
    personalidade: { type: String, default: '', maxlength: 100000 },
    historia: { type: String, default: '', maxlength: 100000 },
    notas: { type: String, default: '', maxlength: 100000 },
  },
  { timestamps: true, versionKey: false },
)

module.exports =
  mongoose.models.CharacterSheet || mongoose.model('CharacterSheet', characterSheetSchema)
