import React from 'react'

import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Users from './pages/Users/user'

import { Switch, Route } from 'react-router-dom'

function Routes() {

    return (
        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/home' component={Home} />
            <Route path='/users' component={Users} exact />
        </Switch>
    );
}

export default Routes;
