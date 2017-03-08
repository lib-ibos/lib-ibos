import React, {Component} from 'react'
import {render}  from 'react-dom';

import Nav from '../nav/nav'
//style
import './sidebar.less';

class Sidebar extends Component{
    render(){
        return (
            <div className="layout__sidebar">
                <Nav/>
            </div>
        );
    }
}

export default Sidebar;