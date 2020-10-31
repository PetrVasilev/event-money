import gql from 'graphql-tag'

export const FIND_MANY_SERVICE = gql`
    query ($where:ServiceWhereInput!){
        findManyService(where: $where){
            id
            createdAt
            updatedAt
            name
            amount
            description
            category{
                types
            }
        }
    }
`
