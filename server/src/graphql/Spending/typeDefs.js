const { default: gql } = require('graphql-tag')

const Spending = gql`
  type Spending {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    amount: String!
    description: String
    event: Event
    eventId: String
    category: Category
    categoryId: String
    service: Service
    serviceId: String
  }

  type Query {
    findManySpending(
      where: SpendingWhereInput
      orderBy: [SpendingOrderByInput!]
      cursor: SpendingWhereUniqueInput
      distinct: SpendingDistinctFieldEnum
      skip: Int
      take: Int
    ): [Spending!]
    findManySpendingCount(
      where: SpendingWhereInput
      orderBy: [SpendingOrderByInput!]
      cursor: SpendingWhereUniqueInput
      distinct: SpendingDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneSpending(data: SpendingCreateInput!): Spending!
    updateOneSpending(
      where: SpendingWhereUniqueInput!
      data: SpendingUpdateInput!
    ): Spending!
    deleteOneSpending(where: SpendingWhereUniqueInput!): Spending
  }
`

module.exports = {
  Spending,
}
