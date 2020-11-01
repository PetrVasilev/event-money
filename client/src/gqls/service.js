import { gql } from '@apollo/client'

export const FIND_MANY_SERVICE = gql`
    query($where: ServiceWhereInput){
        findManyService(where: $where){
            id
            amount
            name
            description
            category{
                id
                name
            }
        }
    }
`