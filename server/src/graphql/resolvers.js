const { Template } = require('./Template/resolvers')
const { Service } = require('./Service/resolvers')
const { Category } = require('./Category/resolvers')
const { Spending } = require('./Spending/resolvers')
const { Event } = require('./Event/resolvers')
const { User } = require('./User/resolvers')
const { Admin } = require('./Admin/resolvers')

const resolvers = [Admin, User, Event, Spending, Category, Service, Template]

module.exports = { resolvers }
