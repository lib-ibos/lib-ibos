
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from './reactRouter'

function getIndex(nextState, cb) {
    cb(null, require(`./.`));
}

function getDemo(nextState, cb) {
    const {component} = nextState.params
    const name = component.charAt(0).toUpperCase() + component.slice(1);
    cb(null, require(`./samples/${name}Demo`));
}

class App extends React.Component {

    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/" getComponent={getIndex}>
                    <Route path=":component" getComponent={getDemo} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))




