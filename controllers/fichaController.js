const CharacterSheet = require('../models/CharacterSheet')

const fichaFields = [
  'nome',
  'jogador',
  'raca',
  'subraca',
  'papel',
  'nivel',
  'vidaAtual',
  'caminho',
  'manaPotencial',
  'manaAtual',
  'auraGrau',
  'auraAtual',
  'auraCaminho',
  'armadura',
  'escudo',
  'versao',
  'papelTeste',
  'papelUsado',
  'atributos',
  'pericias',
  'itens',
  'artefatos',
  'foto',
  'fotoOriginal',
  'fotoRecorte',
  'montariaId',
  'montaria',
  'montariaOriginal',
  'montariaRecorte',
  'personalidade',
  'historia',
  'notas',
]

function fichaData(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  return Object.fromEntries(fichaFields.filter((key) => Object.hasOwn(body, key)).map((key) => [key, body[key]]))
}

function handleError(res, error, message) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Dados da ficha inválidos.' })
  }
  console.error('Character sheet request failed:', error.message)
  return res.status(500).json({ success: false, error: message })
}

exports.criarFicha = async (req, res) => {
  const data = fichaData(req.body)
  if (!data || typeof data.nome !== 'string' || data.nome.length > 300) {
    return res.status(400).json({ success: false, error: 'Informe um nome válido para a ficha.' })
  }
  try {
    const ficha = await CharacterSheet.create({ ...data, userId: String(req.user._id) })
    return res.status(201).json({ success: true, ficha })
  } catch (error) {
    return handleError(res, error, 'Não foi possível salvar a ficha.')
  }
}

exports.listarFichasDoJogador = async (req, res) => {
  try {
    const fichas = await CharacterSheet.find({ userId: String(req.user._id) })
      .select('nome raca subraca papel nivel updatedAt')
      .sort({ updatedAt: -1, _id: -1 })
      .lean()
    return res.status(200).json({ success: true, fichas })
  } catch (error) {
    return handleError(res, error, 'Erro ao buscar fichas.')
  }
}

exports.obterFicha = async (req, res) => {
  try {
    const ficha = await CharacterSheet.findOne({
      _id: req.params.id,
      userId: String(req.user._id),
    }).lean()
    if (!ficha) return res.status(404).json({ success: false, error: 'Ficha não encontrada.' })
    return res.status(200).json({ success: true, ficha })
  } catch (error) {
    return handleError(res, error, 'Erro ao buscar ficha.')
  }
}

exports.atualizarFicha = async (req, res) => {
  const data = fichaData(req.body)
  if (!data || typeof data.nome !== 'string' || data.nome.length > 300) {
    return res.status(400).json({ success: false, error: 'Informe um nome válido para a ficha.' })
  }
  try {
    const ficha = await CharacterSheet.findOneAndUpdate(
      { _id: req.params.id, userId: String(req.user._id) },
      { $set: data },
      { returnDocument: 'after', runValidators: true },
    )
    if (!ficha) return res.status(404).json({ success: false, error: 'Ficha não encontrada.' })
    return res.status(200).json({ success: true, ficha })
  } catch (error) {
    return handleError(res, error, 'Não foi possível atualizar a ficha.')
  }
}

exports.excluirFicha = async (req, res) => {
  try {
    const ficha = await CharacterSheet.findOneAndDelete({
      _id: req.params.id,
      userId: String(req.user._id),
    })
    if (!ficha) return res.status(404).json({ success: false, error: 'Ficha não encontrada.' })
    return res.status(200).json({ success: true })
  } catch (error) {
    return handleError(res, error, 'Não foi possível excluir a ficha.')
  }
}
