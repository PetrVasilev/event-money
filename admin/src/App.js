import 'antd/dist/antd.css'
import React from 'react'
import apollo from "./utils/apollo"
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import Login from "./pages/login"

const App = () => {
    return (
        <ApolloProvider client={apollo}>
            <Router>
                <Route exact path={'/login'} component={Login}/>
            </Router>
        </ApolloProvider>
    );
}

export default App;
