const { default: gql } = require('graphql-tag')

const User = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    connect: String
    events(
      where: EventWhereInput
      orderBy: EventOrderByInput
      cursor: EventWhereUniqueInput
      take: Int
      skip: Int
      distinct: EventDistinctFieldEnum
    ): [Event!]!
  }

  type Query {
    findOneUser(where: UserWhereUniqueInput!): User
    findFirstUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): [User!]
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserDistinctFieldEnum
      skip: Int
      take: Int
    ): AggregateUser
  }
  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
  }
`

module.exports = {
  User,
}
