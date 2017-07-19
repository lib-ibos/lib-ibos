import React, {Component} from 'react'
import {render}  from 'react-dom';
import classnames  from 'classnames';
import { Link} from '../../../src/reactRouter';


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
                                <Link to={item.href} activeClassName="nav__link--active" className={classnames('nav__link',{'has-subnav':item.children})} onClick={this.slideToggle}><Icon type={item.icon} />{item.label}</Link>
                                {item.children &&
                                    <ol className="subnav">
                                    {item.children.map(item =>
                                        <li className="subnav__item" key={item.label.toString()}>
                                            <Link to={item.href} className="subnav__link" activeClassName="nav__link--active">{item.label}</Link>
                                        </li>
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
            icon: 'laptop',
            href:'list'
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
            icon: 'laptop',
            href:"/components/button"
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
          href:'/crm',
            children: [
                {
                    label: 'Home',
                    href:'/crmHome'
                },
                {
                    label:"detail",
                    href:'/crmDetail'
                }, {
                label:"合同执行管理",
                href:'/contractManage'
              }
            ]
        }

    ]
}

export default Nav;