import { gql } from '@apollo/client'

export const CREATE_ONE_SPENDING = gql`
    mutation($data: SpendingCreateInput!){
        createOneSpending(data: $data) {
            id
            createdAt
            amount
            description
            category {
                id
                name
            }
        }
    }
`

export const FIND_MANY_SPENDING = gql`
    query($where: SpendingWhereInput){
        findManySpending(where: $where){
            id
            createdAt
            amount
            description
            category {
                id
                name
            }
        }
    }
`

export const DELTE_ONE_SPENDING = gql`
    mutation{
        deleteOneSpending(where:{id: "ckgxcy1gr0146vkw83c3eje7v"}){
            id
        }
    }
`