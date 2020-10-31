import { gql } from '@apollo/client'

export const CREATE_ONE_SPENDING = gql`
    mutation($data: SpendingCreateInput!){
        createOneSpending(data: $data) {
            id
            createdAt
            amount
            category {
                id
                name
            }
        }
    }
`