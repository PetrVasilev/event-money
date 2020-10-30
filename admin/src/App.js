import React from 'react'
import apollo from "./utils/apollo"
import { ApolloProvider } from '@apollo/react-hooks'

const App = () => {
    return (
        <ApolloProvider client={apollo}>
            <div>
                hello
            </div>
        </ApolloProvider>
    );
}

export default App;
