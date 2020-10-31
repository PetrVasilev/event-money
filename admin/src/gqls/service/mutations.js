import gql from 'graphql-tag'

export const CREATE_ONE_SERVICE = gql`
    mutation ($data:ServiceCreateInput!){
        createOneService(data: $data){
            id
            createdAt
            updatedAt
            name
            amount
            description
        }
    }
`
export const UPDATE_ONE_SERVICE = gql`
    mutation ($data:ServiceUpdateInput!,$where:ServiceWhereInput){
        updateOneService(where:$where,data:$data ){
            
        }
    }
`


