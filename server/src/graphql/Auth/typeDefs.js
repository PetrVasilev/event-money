const { default: gql } = require('graphql-tag')

const Auth = gql`
  type Query {
    admin: Admin
    user(where: AuthUserInput): User!
  }
  type Mutation {
    signInAdmin(data: SignInAdmin!): Admin!
  }
  input SignInAdmin {
    login: String!
    password: String!
  }
  input AuthUserInput {
    id: String!
  }
`

module.exports = {
  Auth,
}
