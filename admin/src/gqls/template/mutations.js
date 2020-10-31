import gql from 'graphql-tag'

export const CREATE_ONE_TEMPLATE=gql`
    mutation ($data:TemplateCreateInput!)
    {
        createOneTemplate(data: $data){
            id
            name
        }
    }
`
