import React from 'react'

import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Users from './pages/Users/user'
import Profile from './pages/Profile/profile'

import { Provider } from 'react-redux'
import store from './store/index'

import { Switch, Route } from 'react-router-dom'

function Routes() {

    return (
        <Switch>
            <Provider store={store} >
                <Route path='/' component={Login} exact />
                <Route path='/home' component={Home} />
                <Route path='/users' component={Users} exact />
                <Route path='/users/profile' component={Profile} />
            </Provider>
        </Switch>
    );
}

export default Routes;
