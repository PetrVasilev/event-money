import gql from 'graphql-tag'

export const CREATE_ONE_CATEGORY = gql`
    mutation($data: CategoryCreateInput!) {
        createOneCategory(data: $data) {
            id
            name
            updatedAt
            createdAt
            types
        }
    }
`
