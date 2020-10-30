const { Spending } = require('./Spending/resolvers')
const { Event } = require('./Event/resolvers')
const { User } = require('./User/resolvers')
const { Admin } = require('./Admin/resolvers')

const resolvers = [Admin, User, Event, Spending]

module.exports = { resolvers }
