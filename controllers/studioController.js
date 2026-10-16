const fs = require('node:fs')
const path = require('node:path')
const { randomBytes } = require('node:crypto')
const { valid: validDoc } = require('../assets/js/studio-documents.js')

const levels = { contador: 1, mestre: 2, deus: 3 }
const labels = {
  contador: 'Contador de Histórias',
  mestre: 'Mestre das Aventuras',
  deus: 'Deus das Lendas',
}
const requirements = { campaigns: 2, adventures: 3, atlas: 3, creations: 3, chronicles: 3 }
const entitlement = (models, id) =>
  id ? models.Entitlement.findOne({ userId: id, expires: { $gt: Date.now() } }).lean() : null
const fail = (status) => {
  throw Object.assign(Error(), { status })
}

async function allowed(models, id, rank = 1) {
  if (!id) fail(401)
  const access = await entitlement(models, id)
  if (!access || !(levels[access.plan] >= rank)) fail(403)
  return access
}

const string = (value, max = 20000) => typeof value === 'string' && value.length <= max

async function getDocs(models, id, kind) {
  const row = await models.StudioDocument.findOne({ userId: id, kind }).lean()
  return row ? { documents: row.payload, version: row.version } : { documents: [], version: 0 }
}

async function viewer(models, share) {
  await allowed(models, share.userId, 2)
  const document = (await getDocs(models, share.userId, 'campaigns')).documents.find(
    (item) => item.id === share.campaignId,
  )
  if (!document) fail(404)
  const visible = (items, keys) =>
    items
      .filter((item) => item.revealed === true)
      .map((item) => Object.fromEntries(keys.map((key) => [key, item[key] ?? ''])))
  return {
    name: document.name,
    announcement: document.announcement || '',
    sessions: visible(document.sessions, ['name', 'summary']),
    npcs: visible(document.npcs, ['name', 'role', 'relation']),
    quests: visible(document.quests, ['name', 'status', 'description']),
    inventory: visible(document.inventory, ['name', 'quantity', 'holder']),
    encounter: document.encounter
      .filter((item) => item.revealed === true)
      .map((item) => ({
        name: item.name,
        initiative: item.initiative,
        conditions: item.conditions,
        active: item.id === document.activeId,
      })),
    round: document.round || 1,
  }
}

async function handle({ req, res, url, data, models, user, config, reply }) {
  const route = url.pathname
  if (route.startsWith('/api/table/')) {
    if (req.method !== 'GET') fail(405)
    const share = await models.StudioShare.findOne({ token: route.split('/').at(-1) }).lean()
    if (!share) fail(404)
    reply(res, 200, await viewer(models, share))
    return true
  }
  if (route === '/api/studio/resources') {
    if (req.method !== 'GET') fail(405)
    const access = await allowed(models, user)
    const raw = JSON.parse(
      fs.readFileSync(path.join(path.dirname(config.libraryPath), 'studio.json'), 'utf8'),
    )
    reply(res, 200, {
      plan: access.plan,
      kits: raw.kits.filter(
        (kit) => (levels[kit.minPlan || 'contador'] || Infinity) <= levels[access.plan],
      ),
      campaigns: levels[access.plan] >= 2 ? raw.campaigns : [],
      templates: levels[access.plan] >= 3 ? raw.templates : [],
    })
    return true
  }
  if (route === '/api/bonus-book') {
    if (req.method !== 'GET') fail(405)
    await allowed(models, user)
    const file = path.join(path.dirname(config.libraryPath), 'bonus-valedria.pdf')
    if (!fs.existsSync(file)) fail(404)
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Valedria-O-que-a-areia-nao-levou.pdf"',
    })
    fs.createReadStream(file).pipe(res)
    return true
  }
  if (route.startsWith('/api/studio/documents/')) {
    const kind = route.split('/').at(-1)
    if (!requirements[kind]) fail(404)
    await allowed(models, user, requirements[kind])
    if (req.method === 'GET') {
      reply(res, 200, await getDocs(models, user, kind))
      return true
    }
    if (req.method !== 'POST') fail(405)
    if (!Number.isInteger(data.version) || !validDoc(kind, data.documents)) fail(400)
    const version = data.version + 1
    if (data.version === 0) {
      try {
        await models.StudioDocument.create({
          userId: user,
          kind,
          payload: data.documents,
          version,
        })
      } catch (error) {
        if (error.code === 11000) fail(409)
        throw error
      }
    } else {
      const result = await models.StudioDocument.updateOne(
        { userId: user, kind, version: data.version },
        { $set: { payload: data.documents, version } },
      )
      if (!result.matchedCount) fail(409)
    }
    reply(res, 200, { version })
    return true
  }
  if (route === '/api/studio/share') {
    if (req.method !== 'POST') fail(405)
    await allowed(models, user, 2)
    if (
      !string(data.campaignId, 80) ||
      !(await getDocs(models, user, 'campaigns')).documents.some(
        (document) => document.id === data.campaignId,
      )
    ) {
      fail(404)
    }
    if (data.revoke === true) {
      await models.StudioShare.deleteOne({ userId: user, campaignId: data.campaignId })
      reply(res, 200, { revoked: true })
      return true
    }
    let share = await models.StudioShare.findOne({
      userId: user,
      campaignId: data.campaignId,
    }).lean()
    if (!share) {
      try {
        share = await models.StudioShare.create({
          token: randomBytes(32).toString('hex'),
          userId: user,
          campaignId: data.campaignId,
        })
      } catch (error) {
        if (error.code !== 11000) throw error
        share = await models.StudioShare.findOne({
          userId: user,
          campaignId: data.campaignId,
        }).lean()
      }
    }
    reply(res, 200, { token: share.token })
    return true
  }
  return false
}

module.exports = { entitlement, levels, labels, handle }
