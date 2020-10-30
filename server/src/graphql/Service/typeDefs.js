const { default: gql } = require('graphql-tag')

const Service = gql`
  type Service {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    amount: String!
    description: String
    category: Category
    categoryId: String
    templates(
      where: TemplateWhereInput
      orderBy: TemplateOrderByInput
      cursor: TemplateWhereUniqueInput
      take: Int
      skip: Int
      distinct: TemplateDistinctFieldEnum
    ): [Template!]!
    spendings(
      where: SpendingWhereInput
      orderBy: SpendingOrderByInput
      cursor: SpendingWhereUniqueInput
      take: Int
      skip: Int
      distinct: SpendingDistinctFieldEnum
    ): [Spending!]!
  }

  type Query {
    findOneService(where: ServiceWhereUniqueInput!): Service
    findFirstService(
      where: ServiceWhereInput
      orderBy: [ServiceOrderByInput!]
      cursor: ServiceWhereUniqueInput
      distinct: ServiceDistinctFieldEnum
      skip: Int
      take: Int
    ): [Service!]
    findManyService(
      where: ServiceWhereInput
      orderBy: [ServiceOrderByInput!]
      cursor: ServiceWhereUniqueInput
      distinct: ServiceDistinctFieldEnum
      skip: Int
      take: Int
    ): [Service!]
    findManyServiceCount(
      where: ServiceWhereInput
      orderBy: [ServiceOrderByInput!]
      cursor: ServiceWhereUniqueInput
      distinct: ServiceDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateService(
      where: ServiceWhereInput
      orderBy: [ServiceOrderByInput!]
      cursor: ServiceWhereUniqueInput
      distinct: ServiceDistinctFieldEnum
      skip: Int
      take: Int
    ): AggregateService
  }
  type Mutation {
    createOneService(data: ServiceCreateInput!): Service!
    updateOneService(
      where: ServiceWhereUniqueInput!
      data: ServiceUpdateInput!
    ): Service!
    deleteOneService(where: ServiceWhereUniqueInput!): Service
  }
`

module.exports = {
  Service,
}
