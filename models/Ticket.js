const mongoose = require('mongoose')
const { randomUUID } = require('node:crypto')

const ticketSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  userId: { type: String, required: true, index: true },
  subject: { type: String, required: true },
  status: { type: String, default: 'open' },
  created: { type: Number, required: true },
  messages: [
    new mongoose.Schema(
      {
        sender: { type: String, required: true },
        body: { type: String, required: true },
        created: { type: Number, required: true },
      },
      { _id: false },
    ),
  ],
})

module.exports = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)
