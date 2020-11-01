const { Template } = require('./Template/typeDefs')
const { Service } = require('./Service/typeDefs')
const { Category } = require('./Category/typeDefs')
const { Spending } = require('./Spending/typeDefs')
const { Event } = require('./Event/typeDefs')
const { User } = require('./User/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { Auth } = require('./Auth/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([
    sdlInputs(),
    Admin,
    User,
    Event,
    Spending,
    Category,
    Service,
    Template,
    Auth
])

module.exports = { typeDefs }
