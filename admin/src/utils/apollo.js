import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import {createUploadLink} from "apollo-upload-client"
import fetch from 'node-fetch'

const authLink = setContext(async (_, { headers }) => {
    let token
    if (typeof window !== 'undefined') {
        token = await localStorage.getItem('token')
    }
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        )
    if (networkError) console.log(`[Network error]: ${networkError}`);
})

const uploadLink = createUploadLink({
    uri: `${process.env.REACT_APP_URL}`,
    credentials:'same-origin',
    fetch
})

const link = ApolloLink.from([authLink, errorLink, uploadLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client
