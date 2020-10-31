const { default: gql } = require('graphql-tag')

const Template = gql`
  type Template {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String
    amount: String!
    types: [TypeEnum]
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
    findManyTemplate(
      where: TemplateWhereInput
      orderBy: [TemplateOrderByInput!]
      cursor: TemplateWhereUniqueInput
      distinct: TemplateDistinctFieldEnum
      skip: Int
      take: Int
    ): [Template!]
    findManyTemplateCount(
      where: TemplateWhereInput
      orderBy: [TemplateOrderByInput!]
      cursor: TemplateWhereUniqueInput
      distinct: TemplateDistinctFieldEnum
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneTemplate(data: TemplateCreateInput!): Template!
    updateOneTemplate(
      where: TemplateWhereUniqueInput!
      data: TemplateUpdateInput!
    ): Template!
    deleteOneTemplate(where: TemplateWhereUniqueInput!): Template
  }
`

module.exports = {
  Template,
}
