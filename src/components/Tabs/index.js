import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';
import classnames  from 'classnames';
// import RcTabs , { TabPane } from 'rc-tabs'
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import {Tabs, Button} from 'antd'
import Dropdown from '../Dropdown/'
const TabPane = Tabs.TabPane
import Menu, {MenuItem, Divider} from 'rc-menu';
//style
import './styles/';


class OTabs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            panes: [],
            dropdownVisible: false
        }
    }

    static defaultProps = {
        prefixCls: 'o-tabs',
    }


    setTitle = (tabItem) => {
        let title = this.props.title
        let titlePane = !!title && <TabPane tab={title} disabled={true} key="__ttile"></TabPane>
        return !!title && tabItem.unshift(titlePane)
    }


    onVisibleChange = (visible) => {
        this.setState({
            dropdownVisible: visible
        });
    }

    handlerDropdownConfirm = (selectkeys) => {
        this.concatTabsItem(selectkeys)
    }

    concatTabsItem = (list) => {
        let {prefixCls, addTabsItemText, children, nextCnt,dropdownStyle} = this.props
        const visibleList = list.sort(function (a, b) {
            return a > b ? 1 : -1
        })

        const menuItems = [];
        children.forEach(function (item, index) {
            menuItems.push(<MenuItem key={index}>{children[index].props.tab}</MenuItem>)
        })

        const menu = (
            <Menu >
                {menuItems}
            </Menu>
        );

        //当只有一个children 的时候，children 是object
        !Array.isArray(children) && (children = [children])

        //筛选掉 hidden 属性的元素
        const _children = []
        visibleList.forEach(function (item) {
            _children.push(children[item])
        })


        if (!!addTabsItemText) {
            nextCnt = <Dropdown
                trigger={['click']}
                overlay={menu}
                multiple
                selectedKeys={list}
                dropdownStyle={dropdownStyle}
                onConfirm={this.handlerDropdownConfirm}
                uniqueSelect
            >
                <Button size="small" type="dashed">
                    {addTabsItemText}
                </Button>
            </Dropdown>
        }

        let nextPane = <TabPane tab={<span className={prefixCls + '__next'}>{nextCnt}</span>} disabled={true}
                                key="__fn"></TabPane>

        this.setTitle(_children)
        if (!!nextCnt || !!addTabsItemText) {
            _children.push(nextPane)
        }

        this.setState({
            panes: _children
        })
    }

    initVisibleList = () => {
        let visibleList = []
        let children = this.props.children
        for (let x in children) {
            !!!children[x].props.hidden && visibleList.push(x)
        }
        return visibleList
    }

    componentWillMount() {
        this.concatTabsItem(this.initVisibleList())
    }

    render() {
        let {prefixCls, addTabsItemText, children, nextCnt, title, ...props} = this.props;

        let classNames = classnames({
            [prefixCls]: !!title,
            [prefixCls + '--small']: this.props.type == "card" && this.props.size == "small"
        })

        return (
            <Tabs
                {...props}
                className={classNames}
            >
                {this.state.panes}
            </Tabs>
        )
    }
}

OTabs.TabPane = TabPane;

export default OTabs