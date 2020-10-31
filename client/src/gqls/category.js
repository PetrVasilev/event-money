import { gql } from '@apollo/client'

export const FIND_MANY_CATEGORY = gql`
    query($where: CategoryWhereInput) {
        findManyCategory(where: $where) {
            id
            name
        }
    }
`
