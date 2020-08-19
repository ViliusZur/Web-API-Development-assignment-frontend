import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import all routes
import Home from './components/Blank';
import Signup from './components/Signup/Signup';
import Login from './components/Signup/Login';

export default function Routes(){
    return(
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={Signup} />  
            <Route path='/login' exact component={Login} />        
        </Switch>
    );
}