import gql from 'graphql-tag'

export const FIND_MANY_SERVICE = gql`
    query {
        findManyService{
            id
            createdAt
            updatedAt
            name
            amount
            description
        }
    }
`
