import 'antd/dist/antd.css'
import React from 'react'
import apollo from "./utils/apollo"
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'
import Login from "./pages/login"
import Sider from "./components/sider"
import Category from "./pages/category"
import Padding from "./components/padding"

const App = () => {
    return (
        <ApolloProvider client={apollo}>
            <Router>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path="/authorized/:path?/">
                    <Sider/>
                    <Switch>
                        <Padding>
                            <Route exact path={'/authorized/category'} component={Category}/>
                        </Padding>
                    </Switch>
                </Route>
            </Router>
        </ApolloProvider>
    );
}

export default App;
