const { default: gql } = require('graphql-tag')

const Admin = gql`
  type Admin {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    login: String!
    password: String!
  }
`

module.exports = {
  Admin,
}
