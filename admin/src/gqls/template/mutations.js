import gql from 'graphql-tag'

export const CREATE_ONE_TEMPLATE = gql`
    mutation ($data:TemplateCreateInput!)
    {
        createOneTemplate(data: $data){
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
export const UPDATE_ONE_TEMPLATE = gql`
    mutation ($data:TemplateUpdateInput!,$where:TemplateWhereUniqueInput!){
        updateOneTemplate(where: $where, data: $data){
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
export const DELETE_ONE_TEMPLATE = gql`
    mutation ($where:TemplateWhereUniqueInput!){
        deleteOneTemplate(where: $where){
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
