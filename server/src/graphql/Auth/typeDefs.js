const { default: gql } = require('graphql-tag')

const Auth = gql`
  type Query {
    admin: Admin
  }
  type Mutation {
    signInAdmin(data: SignInAdmin!): Admin!
  }
  input SignInAdmin {
    login: String!
    password: String!
  }
`

module.exports = {
  Auth,
}
