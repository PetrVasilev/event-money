import { gql } from '@apollo/client'

export const CREATE_ONE_SPENDING = gql`
    mutation($data: SpendingCreateInput!) {
        createOneSpending(data: $data) {
            id
            createdAt
            amount
            description
            category {
                id
                name
                types
            }
        }
    }
`

export const FIND_MANY_SPENDING = gql`
    query($where: SpendingWhereInput $orderBy: [SpendingOrderByInput!]) {
        findManySpending(where: $where orderBy: $orderBy) {
            id
            createdAt
            amount
            description
            category {
                id
                name
                types
            }
        }
    }
`

export const DELETE_ONE_SPENDING = gql`
    mutation($where: SpendingWhereUniqueInput!) {
        deleteOneSpending(where: $where) {
            id
        }
    }
`

export const UPDATE_ONE_SPENDING = gql`
    mutation($where: SpendingWhereUniqueInput! $data: SpendingUpdateInput!) {
        updateOneSpending(where: $where data: $data) {
            id
            createdAt
            amount
            description
            category {
                id
                name
                types
            }
        }
    }
`
