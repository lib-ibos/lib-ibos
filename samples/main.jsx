// import 'ibos/styles/framework.less';
import React, {Component} from 'react'
import {render}  from 'react-dom';
import { Router, Route,IndexRoute,hashHistory } from '../src/reactRouter';

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('fetch-ie8');
import Frame from './widgets/layout/frame'
import Home from './pages/home'


function getDemo(nextState, cb) {
    const {component,sub} = nextState.params;
    // console.log(nextState.params)
    if(sub){
        cb(null, require(`./pages/${component}/${sub}`));
    }else {
        cb(null, require(`./pages/${component}`));
    }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={Frame} >
            <IndexRoute component={Home}/>
            <Route path=":component(/:sub)" getComponent={getDemo} />
        </Route>
    </Router>,
    document.getElementById("app")
);