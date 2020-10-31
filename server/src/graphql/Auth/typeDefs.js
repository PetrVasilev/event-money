const { default: gql } = require('graphql-tag')

const Auth = gql`
  type Query {
    admin: Admin
    user(where: AuthUserInput): User!
  }
  type Mutation {
    signInAdmin(data: SignInAdminInput): AdminAuthOutput!
  }
  input SignInAdminInput {
    login: String!
    password: String!
  }
  input AuthUserInput {
    id: String!
  }
  type AdminAuthOutput{
    admin:Admin!
    token:String!
  }
`

module.exports = {
  Auth,
}
