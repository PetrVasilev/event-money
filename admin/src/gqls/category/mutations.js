import gql from 'graphql-tag'

export const CREATE_ONE_CATEGORY = gql`
    mutation ($data:CategoryCreateInput!){
        createOneCategory(data: $data){
            name
            id
            types
        }
    }
`
export const UPDATE_ONE_CATEGORY = gql`
    mutation ($data:CategoryUpdateInput!, $where:CategoryWhereUniqueInput!){
        updateOneCategory(data: $data){
            name
            id
            types
        }
    }
`

export const DELETE_ONE_CATEGORY = gql`
    mutation ($where:CategoryWhereUniqueInput!){
        deleteOneCategory(where: $where){
            name
            id
            types
        }
    }
`
