import React, {Component} from 'react'
import {render}  from 'react-dom';
import classnames  from 'classnames';

import {Icon,Badge} from 'antd';
//style
import './nav.less';

class Nav extends Component{
    constructor(props){
        super(props)
        this.slideToggle = this.slideToggle.bind(this);
    }

    slideToggle(event){
        console.log(this)
    }

    render(){
        return (
                <ul className="nav">
                    {
                        this.props.navArr.map(item =>
                            item.isCat ?
                            <li className="nav__cat" key={item.label.toString()}>{item.label}</li> :
                            <li className="nav__item" key={item.label.toString()}>
                                <a href={item.href} className={classnames('nav__link',{'has-subnav':item.children})} onClick={this.slideToggle}><Icon type={item.icon} />{item.label}</a>
                                {item.children &&
                                    <ol className="subnav">
                                    {item.children.map(item =>
                                        <li className="subnav__item" key={item.label.toString()}><a href={item.href} className="subnav__link">{item.label}</a></li>
                                )}
                                    </ol>
                                }
                            </li>
                        )
                    }
                </ul>
        );
    }
}

Nav.defaultProps = {
    navArr:[
        {
            label: '首页',
            icon: 'inbox',
            href:'/'
        },
        {
            label: '布局 Layout',
            isCat : true
        },
        {
            label: '查询结果页 List',
            icon: 'laptop'
        },
        {
            label: '表单页 Form',
            icon: 'appstore',
            children: [
                {
                    label: '查询结果页 List',
                    href:'detail'
                }
            ]
        },
        {
            label: '组件 Components',
            isCat : true
        },
        {
            label: '按钮 Button',
            icon: 'laptop'
        },
        {
            label: '面板 Panel',
            icon: 'laptop'
        }
        ,
        {
            label: '页面 Pages',
            isCat : true
        },
        {
            label: 'CRM',
            icon: 'laptop',
            children: [
                {
                    label: 'Home',
                    href:'/crmHome'
                },
                {
                    label:"detail",
                    href:'/crmDetail'
                }
            ]
        }

    ]
}

export default Nav;