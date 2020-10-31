import gql from 'graphql-tag'

export const FIND_MANY_CATEGORY = gql`
    query {
        findManyCategory{
            id
            name
            updatedAt
            createdAt
            types
        }
    }
`
