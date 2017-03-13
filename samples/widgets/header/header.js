import React, {Component} from 'react'
import {render}  from 'react-dom';
import { Menu, Dropdown,Icon,Badge   } from 'antd';
//style
import './header.less';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="#">我的账号</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="#/">修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">退出账号</Menu.Item>
    </Menu>
);

class Header extends Component{
    render(){
        return (
            <div className="layout__header">
                <div className="logo">
                    <a href="#"><img src="https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png" alt=""/></a>
                </div>
                <div className="headbar">
                    <ul className="headnav">
                        <li><Icon type="search" /></li>
                        <li onClick={this.props.settingBarHandle}><Icon type="setting" /></li>
                        <li>
                            <Badge count={5}>
                                <Icon type="question-circle" />
                            </Badge>
                        </li>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <li className="account-info">
                                <div className="account-info__pic">张</div>
                                <div className="account-info__name">张三丰</div>
                            </li>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;