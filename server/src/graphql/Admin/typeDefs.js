const { default: gql } = require('graphql-tag')

const Admin = gql`
  type Admin {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    login: String!
    password: String!
  }

  type Query {
    findOneAdmin(where: AdminWhereUniqueInput!): Admin
    findFirstAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminDistinctFieldEnum
      skip: Int
      take: Int
    ): [Admin!]
    findManyAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminDistinctFieldEnum
      skip: Int
      take: Int
    ): [Admin!]
    findManyAdminCount(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminDistinctFieldEnum
      skip: Int
      take: Int
    ): AggregateAdmin
  }
  type Mutation {
    createOneAdmin(data: AdminCreateInput!): Admin!
    updateOneAdmin(
      where: AdminWhereUniqueInput!
      data: AdminUpdateInput!
    ): Admin!
    deleteOneAdmin(where: AdminWhereUniqueInput!): Admin
  }
`

module.exports = {
  Admin,
}
