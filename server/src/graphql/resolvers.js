const { User } = require('./User/resolvers')
const { Admin } = require('./Admin/resolvers')

const resolvers = [Admin, User]

module.exports = { resolvers }
