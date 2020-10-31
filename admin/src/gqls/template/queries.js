import gql from 'graphql-tag'

export const FIND_MANY_TEMPLATE = gql`
    query {
        findManyTemplate{
            id
            createdAt
            updatedAt
            name
        }
    }
`
