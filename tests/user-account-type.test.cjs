const assert = require('node:assert/strict')
const User = require('../models/User')

const user = new User({
  googleId: 'google-user-id',
  name: 'Aventureiro',
  email: 'aventureiro@example.com',
})

async function main() {
  assert.equal(user.accountType, 'visitor')
  await user.validate()

  user.accountType = 'invalid-plan'
  await assert.rejects(user.validate(), (error) => error.errors.accountType.kind === 'enum')
  console.log('PASS: new users default to visitor and account types are validated.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
