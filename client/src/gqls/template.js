import { fromPromise } from "@apollo/client";
import { gql } from '@apollo/client'

export const FIND_MENY_TEMPLATE = gql`
    query($where: TemplateWhereInput){
        findManyTemplate(where: $where){
            id
            name
            amount
            services {
                id
                amount
                description
                category{
                    id
                    name
                }
            }
        }
    }
`