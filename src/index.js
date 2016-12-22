import './index.html'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import TableDemo from './demo/TableDemo'

class App extends Component {

    render() {
        return (
            <div>
               <TableDemo />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))