const { User } = require('./User/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([sdlInputs(), Admin, User])

module.exports = { typeDefs }
