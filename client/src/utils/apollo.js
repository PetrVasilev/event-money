import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const url =
    process.env.NODE_ENV === 'production'
        ? 'https://price-event.ru/graphql'
        : 'http://192.168.31.184:4000/graphql'

const authLink = setContext((_, { headers }) => {
    const userId = localStorage.getItem('userId')
    return {
        headers: {
            ...headers,
            id: userId ? userId : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(async ({ message, locations, path }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        })
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = createHttpLink({
    uri: url
})

const link = ApolloLink.from([authLink, errorLink, httpLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client
