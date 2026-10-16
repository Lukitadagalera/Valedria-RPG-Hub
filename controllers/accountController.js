const { randomUUID } = require('node:crypto')

const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max

async function handle({ req, res, url, data, models, user, reply }) {
  if (!url.pathname.startsWith('/api/account/')) return false
  if (!user) {
    reply(res, 401, { error: 'authentication_required' })
    return true
  }

  const route = url.pathname
  if (route === '/api/account/preferences') {
    if (req.method === 'GET') {
      const row = await models.AccountPreferences.findOne({ userId: user }).lean()
      reply(res, 200, row?.payload || {})
      return true
    }
    if (req.method === 'POST') {
      const allowed = { bio: 500, experience: 40, playStyle: 40, availability: 100 }
      const value = {}
      for (const [key, max] of Object.entries(allowed)) {
        if (typeof data[key] !== 'string' || data[key].length > max) {
          reply(res, 400, { error: 'invalid_preferences' })
          return true
        }
        value[key] = data[key].trim()
      }
      await models.AccountPreferences.updateOne(
        { userId: user },
        { $set: { payload: value } },
        { upsert: true },
      )
      reply(res, 200, { ok: true })
      return true
    }
  }
  if (route === '/api/account/ticket-status' && req.method === 'POST') {
    if (!['open', 'closed'].includes(data.status)) {
      reply(res, 400, { error: 'invalid_status' })
      return true
    }
    const ticket = await models.Ticket.findOne({ _id: String(data.id), userId: user }).lean()
    if (!ticket) {
      reply(res, 404, { error: 'not_found' })
      return true
    }
    if (
      data.status === 'open' &&
      (await models.Ticket.countDocuments({ userId: user, status: 'open' })) >= 20
    ) {
      reply(res, 429, { error: 'ticket_limit' })
      return true
    }
    await models.Ticket.updateOne(
      { _id: ticket._id, userId: user },
      { $set: { status: data.status } },
    )
    reply(res, 200, { ok: true })
    return true
  }
  if (route === '/api/account/profile') {
    if (req.method === 'GET') {
      const profile = await models.Profile.findOne(
        { userId: user },
        { name: 1, locale: 1, _id: 0 },
      ).lean()
      reply(res, 200, profile || { name: '', locale: '' })
      return true
    }
    if (req.method === 'POST') {
      if (!text(data.name, 100) || typeof data.locale !== 'string' || data.locale.length > 100) {
        reply(res, 400, { error: 'invalid_profile' })
        return true
      }
      await models.Profile.updateOne(
        { userId: user },
        { $set: { name: data.name.trim(), locale: data.locale.trim() } },
        { upsert: true },
      )
      reply(res, 200, { ok: true })
      return true
    }
  }
  if (route === '/api/account/tickets') {
    if (req.method === 'GET') {
      const tickets = await models.Ticket.find(
        { userId: user },
        { subject: 1, status: 1, created: 1, messages: 1 },
      )
        .sort({ created: -1 })
        .limit(100)
        .lean()
      reply(
        res,
        200,
        {
          tickets: tickets.map((ticket) => ({
            id: ticket._id,
            subject: ticket.subject,
            status: ticket.status,
            created: ticket.created,
            messages: ticket.messages,
          })),
        },
      )
      return true
    }
    if (req.method === 'POST') {
      if (!text(data.subject, 160) || !text(data.message, 4000)) {
        reply(res, 400, { error: 'invalid_ticket' })
        return true
      }
      if ((await models.Ticket.countDocuments({ userId: user, status: 'open' })) >= 20) {
        reply(res, 429, { error: 'ticket_limit' })
        return true
      }
      const id = randomUUID()
      const created = Date.now()
      await models.Ticket.create({
        _id: id,
        userId: user,
        subject: data.subject.trim(),
        status: 'open',
        created,
        messages: [{ sender: 'customer', body: data.message.trim(), created }],
      })
      reply(res, 201, { id })
      return true
    }
  }
  if (route === '/api/account/reply' && req.method === 'POST') {
    const ticket =
      typeof data.id === 'string' && (await models.Ticket.findOne({ _id: data.id, userId: user }))
    if (!ticket) {
      reply(res, 404, { error: 'not_found' })
      return true
    }
    if (ticket.status !== 'open' || !text(data.message, 4000)) {
      reply(res, 400, { error: 'invalid_message' })
      return true
    }
    ticket.messages.push({ sender: 'customer', body: data.message.trim(), created: Date.now() })
    await ticket.save()
    reply(res, 201, { ok: true })
    return true
  }
  reply(res, 404, { error: 'not_found' })
  return true
}

module.exports = { handle }
