import { gql } from '@apollo/client'

export const AUTH_USER = gql`
    query($where: AuthUserInput!) {
        user(where: $where) {
            id
        }
    }
`
