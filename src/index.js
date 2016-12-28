import './index.html'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import ChartDemo from './demo/ChartDemo'
import TableDemo from './demo/TableDemo'
import FormItemDemo from './demo/FormItemDemo'

class App extends Component {

    render() {
        return (
            <div>
               <TableDemo />
               <hr/>
               <FormItemDemo />
               <hr/>
               <ChartDemo />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))