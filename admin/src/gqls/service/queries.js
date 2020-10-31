import gql from 'graphql-tag'

export const FIND_MANY_SERVICE = gql`
    query($where: ServiceWhereInput) {
        findManyService(where: $where) {
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
