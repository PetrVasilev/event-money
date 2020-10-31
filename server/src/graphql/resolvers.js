const { Template } = require('./Template/resolvers')
const { Service } = require('./Service/resolvers')
const { Category } = require('./Category/resolvers')
const { Spending } = require('./Spending/resolvers')
const { Event } = require('./Event/resolvers')
const { User } = require('./User/resolvers')
const { Auth } = require('./Auth/resolvers')

const resolvers = [
  User,
  Event,
  Spending,
  Category,
  Service,
  Template,
  Auth,
]

module.exports = { resolvers }
