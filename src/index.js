import './index.html'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import hashHistory from 'react-router/lib/hashHistory'

import Index from './samples/Index'

class App extends Component {

    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/" component={Index}>
                    <Route path=":component" getComponent={(nextState, cb) => {
                        const {component} = nextState.params
                        const name = component.charAt(0).toUpperCase() + component.slice(1);
                        cb(null, require(`./samples/${name}Demo`));
                    }} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))