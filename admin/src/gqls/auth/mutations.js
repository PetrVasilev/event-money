import gql from 'graphql-tag'

export const SIGN_IN_ADMIN = gql`
    mutation ($data:SignInAdminInput!){
        signInAdmin(data: $data){
            token
            admin{
                id
            }
        }
    }
`
