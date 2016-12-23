import './index.html'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import TableDemo from './demo/TableDemo'
import FormItemDemo from './demo/FormItemDemo'

class App extends Component {

    render() {
        return (
            <div>
               <TableDemo />
               <hr/>
               <FormItemDemo />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))