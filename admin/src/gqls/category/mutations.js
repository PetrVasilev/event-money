import gql from 'graphql-tag'

export const CREATE_ONE_CATEGORY = gql`
    mutation($data: CategoryCreateInput!) {
        createOneCategory(data: $data) {
            id
            name
            types
        }
    }
`
export const UPDATE_ONE_CATEGORY = gql`
    mutation($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {
        updateOneCategory(data: $data, where: $where) {
            id
            name
            types
        }
    }
`

export const DELETE_ONE_CATEGORY = gql`
    mutation($where: CategoryWhereUniqueInput!) {
        deleteOneCategory(where: $where) {
            id
            name
            types
        }
    }
`
