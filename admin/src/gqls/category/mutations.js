import gql from 'graphql-tag'

export const CREATE_ONE_CATEGORY = gql`
    mutation ($data:CategoryCreateInput!){
        createOneCategory(data: $data){
            name
            id
            updatedAt
            createdAt
            types
        }
        
    }
`
