import gql from 'graphql-tag'

export const CREATE_ONE_SERVICE = gql`
    mutation($data: ServiceCreateInput!) {
        createOneService(data: $data) {
            id
            name
            amount
            description
            category {
                name
                types
                id
            }
        }
    }
`
export const UPDATE_ONE_SERVICE = gql`
    mutation($data: ServiceUpdateInput!, $where: ServiceWhereUniqueInput!) {
        updateOneService(where: $where, data: $data) {
            id
            name
            amount
            description
            category {
                name
                types
                id
            }
        }
    }
`
