import { gql } from '@apollo/client'

export const AUTH_USER = gql`
    query($where: AuthUserInput, $data: AuthUserDataInput) {
        user(where: $where, data: $data) {
            id
            name
            avatar
        }
    }
`

export const ADD_ORGANIZATORS = gql`
    mutation($where: EventWhereUniqueInput!, $data: AddUsersInput!) {
        addUsers(where: $where, data: $data) {
            id
            name
            avatar
        }
    }
`
