const { default: gql } = require('graphql-tag')

const Auth = gql`
    type Query {
        admin: Admin
        user(where: AuthUserInput, data: AuthUserDataInput): User!
    }
    type Mutation {
        signInAdmin(data: SignInAdminInput): AdminAuthOutput!
        addUsers(where: EventWhereUniqueInput!, data: AddUsersInput!): [User]
    }
    input SignInAdminInput {
        login: String!
        password: String!
    }
    input AuthUserInput {
        id: String!
    }
    input AuthUserDataInput {
        avatar: String
        name: String!
    }
    type AdminAuthOutput {
        admin: Admin!
        token: String!
    }
    input AddUserInput {
        id: String!
        avatar: String
        name: String!
    }
    input AddUsersInput {
        users: [AddUserInput]
    }
`

module.exports = {
    Auth
}
