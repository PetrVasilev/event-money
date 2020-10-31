import gql from 'graphql-tag'

export const ADMIN = gql`
    query {
        admin {
            id
        }
    }
`
