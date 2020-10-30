const { Spending } = require('./Spending/typeDefs')
const { Event } = require('./Event/typeDefs')
const { User } = require('./User/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([sdlInputs(), Admin, User, Event, Spending])

module.exports = { typeDefs }
