const { default: gql } = require('graphql-tag')

const Auth = gql`
  type Query {
    admin: Admin
    user(where: AuthUserInput, data: AuthUserDataInput): User!
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
  input AuthUserDataInput {
    avatar: String,
    name: String!
  }
  type AdminAuthOutput{
    admin:Admin!
    token:String!
  }
`

module.exports = {
  Auth,
}
