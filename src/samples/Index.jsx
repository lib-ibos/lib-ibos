import React, {Component} from 'react'
import {Link} from '../reactRouter'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import './Index.css'

export default class Index extends Component {

    render() {
        return (
            <div className="ant-layout-aside">
                
                <div className="ant-layout-sider">
                    <div className="ant-layout-logo"><a href="/"><h1>OlymTech</h1></a></div>
                    <Menu 
                        defaultOpenKeys={['nav']}
                        mode="inline"
                    >
                        <SubMenu title="组件预览" key="nav">
                            <Menu.Item key="Chart"><Link to="chart">Chart</Link></Menu.Item>
                            <Menu.Item key="Transfer"><Link to="transfer">Transfer</Link></Menu.Item>
                            <Menu.Item key="Table"><Link to="table">Table</Link></Menu.Item>
                            <Menu.Item key="FormLayout"><Link to="formLayout">FormLayout</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="ant-layout-main">
                    {this.props.children}
                </div>
            </div>
        )
    }
}