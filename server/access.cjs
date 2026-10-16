// Operator-only entitlement management until a verified payment webhook is integrated.
require('dotenv').config({ path: require('node:path').resolve(__dirname, '../.env'), quiet: true })
const mongoose = require('mongoose'),
  { createModels } = require('../models')
const [action, userId, date, plan = 'contador'] = process.argv.slice(2)
if (!process.env.MONGODB_URI || !['grant', 'revoke'].includes(action) || !userId)
  throw Error(
    'Set MONGODB_URI, then: node server/access.cjs grant USER_ID YYYY-MM-DD [plan] | revoke USER_ID',
  )
async function main() {
  const connection = await mongoose.createConnection(process.env.MONGODB_URI).asPromise(),
    models = createModels(connection)
  try {
    if (action === 'grant') {
      if (!['contador', 'mestre', 'deus'].includes(plan)) throw Error('Unknown plan.')
      const expires = Date.parse(date + 'T23:59:59Z')
      if (!Number.isFinite(expires) || expires <= Date.now()) throw Error('Future expiry required.')
      await models.Entitlement.updateOne(
        { userId },
        { $set: { expires, source: 'operator', plan } },
        { upsert: true },
      )
    } else await models.Entitlement.deleteOne({ userId })
    await models.Audit.create({
      at: Date.now(),
      event: action === 'grant' ? 'access_granted' : 'access_revoked',
      userId,
    })
    console.log('Access updated.')
  } finally {
    await connection.close()
  }
}
main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
