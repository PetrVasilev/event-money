const { default: gql } = require('graphql-tag')

const Event = gql`
    type Event {
        id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        date: DateTime!
        type: TypeEnum!
        users(
            where: UserWhereInput
            orderBy: UserOrderByInput
            cursor: UserWhereUniqueInput
            take: Int
            skip: Int
            distinct: UserDistinctFieldEnum
        ): [User!]!
        amount: String
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
        findManyEvent(
            where: EventWhereInput
            orderBy: [EventOrderByInput!]
            cursor: EventWhereUniqueInput
            distinct: EventDistinctFieldEnum
            skip: Int
            take: Int
        ): [Event!]
        findManyEventCount(
            where: EventWhereInput
            orderBy: [EventOrderByInput!]
            cursor: EventWhereUniqueInput
            distinct: EventDistinctFieldEnum
            skip: Int
            take: Int
        ): Int!
    }
    type Mutation {
        createOneEvent(data: EventCreateInput!): Event!
        updateOneEvent(where: EventWhereUniqueInput!, data: EventUpdateInput!): Event!
        deleteOneEvent(where: EventWhereUniqueInput!): Event
    }
    enum TypeEnum {
        OTHER
        WEDDING
        BIRTHDAY
        STAG
        MATINEE
        JUBILEE
        CORPORATE
        BUSINESS
        FORUM
        HACKATHON
    }
`

module.exports = {
    Event
}
