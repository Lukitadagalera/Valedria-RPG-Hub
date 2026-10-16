const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const { createModels } = require('../models')

async function main() {
  const connection = mongoose.createConnection()
  const { CharacterSheet } = createModels(connection)
  try {
    const sheet = new CharacterSheet({
      userId: 'player-1',
      nome: 'Aelric Corvo-Negro',
      nivel: 2,
      caminho: 'Magia',
      atributos: { forca: 2, destreza: 3, constituicao: 4, sabedoria: 5, carisma: 6 },
      pericias: [{ nome: 'Investigação', atributo: 'Sabedoria', especialidade: 'Ruínas antigas' }],
      itens: [{ nome: 'Poção', categoria: 'Consumível', quantidade: 2 }],
      artefatos: [{ nome: 'Anel', grau: 'Raro', efeito: 'Proteção' }],
      fotoRecorte: { version: 2, zoom: 1.2, x: 4, y: 8 },
    })
    await sheet.validate()
    assert.equal(sheet.versao, 6)
    assert.equal(sheet.pericias[0].especialidade, 'Ruínas antigas')
    assert.deepEqual(sheet.fotoRecorte, { version: 2, zoom: 1.2, x: 4, y: 8 })
    assert.ok(CharacterSheet.schema.path('userId').options.index)
    assert.ok(CharacterSheet.schema.path('createdAt'))
    assert.ok(CharacterSheet.schema.path('updatedAt'))

    await assert.rejects(
      new CharacterSheet({ userId: 'player-1', nivel: 11 }).validate(),
      (error) => Boolean(error.errors.nivel),
    )
    await assert.rejects(
      new CharacterSheet({ userId: 'player-1', itens: [{ quantidade: 1 }] }).validate(),
      (error) => Boolean(error.errors['itens.0.nome']),
    )
    await assert.rejects(new CharacterSheet({ nome: 'Sem proprietário' }).validate(), (error) =>
      Boolean(error.errors.userId),
    )
    console.log('PASS: character sheet schema fields, defaults, validation, nested catalog data and ownership.')
  } finally {
    await connection.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
