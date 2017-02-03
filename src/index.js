import './index.html'

require.ensure([], function(){
    const React = require('react')
    const ReactDOM = require('react-dom')
    const Router = require('react-router/lib/Router')
    const Route = require('react-router/lib/Route')
    const IndexRoute = require('react-router/lib/IndexRoute')
    const hashHistory = require( 'react-router/lib/hashHistory')

    const Index = require('./samples/Index')

    class App extends React.Component {

        render() {
            return (
                <Router history={hashHistory} >
                    <Route path="/" component={Index}>
                        <Route path=":component" getComponent={(nextState, cb) => {
                            const {component} = nextState.params
                            const name = component.charAt(0).toUpperCase() + component.slice(1);
                            require.ensure([], function(){
                                cb(null, require(`./samples/${name}Demo`));
                            },'pages')
                        }} />
                    </Route>
                </Router>
            )
        }
    }

    ReactDOM.render(<App/>, document.getElementById('root'))
}, 'lib')



