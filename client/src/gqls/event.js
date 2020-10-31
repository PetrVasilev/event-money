import { gql } from '@apollo/client'

export const FIND_MANY_EVENTS = gql`
    query($where: EventWhereInput) {
        findManyEvent(where: $where) {
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
                }
            }
            type
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
                }
            }
            type
        }
    }
`
