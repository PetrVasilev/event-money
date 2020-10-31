import { gql } from '@apollo/client'

export const FIND_MANY_EVENTS = gql`
    query($where: EventWhereInput $orderBy: [EventOrderByInput!]) {
        findManyEvent(where: $where orderBy: $orderBy) {
            id
            createdAt
            name
            amount
            type
            spendings {
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
            type
            users {
                id
                name
                avatar
            }
        }
    }
`
export const CREATE_ONE_EVENT = gql`
    mutation($data: EventCreateInput!) {
        createOneEvent(data: $data) {
            id
            createdAt
            name
            amount
            type
            spendings {
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
            type
            users {
                id
                name
                avatar
            }
        }
    }
`

export const UPDATE_ONE_EVENT = gql`
    mutation($where: EventWhereUniqueInput!, $data: EventUpdateInput!) {
        updateOneEvent(where: $where, data: $data) {
            id
            createdAt
            name
            amount
            type
            spendings {
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
            type
            users {
                id
                name
                avatar
            }
        }
    }
`

export const DELETE_ONE_EVENT = gql`
    mutation($where: EventWhereUniqueInput!) {
        deleteOneEvent(where: $where) {
            id
            createdAt
            name
            amount
            type
            spendings {
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
            type
            users {
                id
                name
                avatar
            }
        }
    }
`
