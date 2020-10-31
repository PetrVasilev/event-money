import gql from 'graphql-tag'

export const FIND_MANY_TEMPLATE = gql`
    query {
        findManyTemplate{
            id
            description
            name
            amount
            types
            services{
                id
                name
                amount
                description
                category{
                    name
                    types
                    id
                }
            }
        }
    }
`
