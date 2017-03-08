import React, {Component} from 'react'
import {render}  from 'react-dom';

import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import SettingBar from '../settingBar/settingBar';
import Footer from '../footer/footer';
//style
import './layout.less';


class Layout extends Component{

    toggleSettingBar=(type)=>{
        this.refs.layoutSettingBar.toggleEnable(type)
    }

    render(){
        return (
            <div className="layout">
                <Header settingBarHandle={this.toggleSettingBar.bind(this)}/>
                <Sidebar/>
                <div className="layout__content">
                    {this.props.children}
                    <Footer/>
                </div>
                <SettingBar ref="layoutSettingBar"  />
            </div>
        )
    }
}



export default Layout;