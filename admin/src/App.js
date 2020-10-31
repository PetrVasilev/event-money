import 'antd/dist/antd.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import apollo from './utils/apollo'
import Login from './pages/login'
import Sider from './components/sider'
import Padding from './components/padding'
import AddCategory from './pages/addCategory'
import AddService from './pages/addService'
import AddTemplate from './pages/addTemplate'
import { ADMIN } from './gqls/auth/queries'
import Category from './pages/category'
import Service from './pages/service'
import Template from './pages/template'

const App = () => {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState()

    useEffect(() => {
        apollo
            .watchQuery({
                query: ADMIN,
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'ignore'
            })
            .subscribe({
                next: (res) => {
                    const { data, loading } = res
                    if (!loading) setAdmin(data.admin)
                    setLoading(loading)
                }
            })
    }, [])

    return (
        <ApolloProvider client={apollo}>
            <Router>
                {!loading && !admin ? <Redirect to={'/login'} /> : null}
                {admin && window.location.pathname === '/' && <Redirect to={'/authorized'} />}
                <Route exact path={'/login'} component={Login} />
                <Route exact path="/authorized/:path?/">
                    <Sider />
                    <Switch>
                        <Padding>
                            <Route exact path={'/authorized/category'} component={Category} />
                            <Route exact path={'/authorized/service'} component={Service} />
                            <Route exact path={'/authorized/addCategory'} component={AddCategory} />
                            <Route exact path={'/authorized/addService'} component={AddService} />
                            <Route exact path={'/authorized/addTemplate'} component={AddTemplate} />
                            <Route exact path={'/authorized/template'} component={Template} />
                        </Padding>
                    </Switch>
                </Route>
            </Router>
        </ApolloProvider>
    )
}

export default App
