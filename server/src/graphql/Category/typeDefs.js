const { default: gql } = require('graphql-tag')

const Category = gql`
  type Category {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    types: [TypeEnum!]!
    spendings(
      where: SpendingWhereInput
      orderBy: SpendingOrderByInput
      cursor: SpendingWhereUniqueInput
      take: Int
      skip: Int
      distinct: SpendingDistinctFieldEnum
    ): [Spending!]!
    services(
      where: ServiceWhereInput
      orderBy: ServiceOrderByInput
      cursor: ServiceWhereUniqueInput
      take: Int
      skip: Int
      distinct: ServiceDistinctFieldEnum
    ): [Service!]!
  }

  type Query {
    findManyCategory(
      where: CategoryWhereInput
      orderBy: [CategoryOrderByInput!]
      cursor: CategoryWhereUniqueInput
      distinct: CategoryDistinctFieldEnum
      skip: Int
      take: Int
    ): [Category!]
    findManyCategoryCount(
      where: CategoryWhereInput
      orderBy: [CategoryOrderByInput!]
      cursor: CategoryWhereUniqueInput
      distinct: CategoryDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneCategory(data: CategoryCreateInput!): Category!
    updateOneCategory(
      where: CategoryWhereUniqueInput!
      data: CategoryUpdateInput!
    ): Category!
    deleteOneCategory(where: CategoryWhereUniqueInput!): Category
  }
`

module.exports = {
  Category,
}
