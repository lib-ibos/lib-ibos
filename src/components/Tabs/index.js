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

function sortACS(data) {
    return data.sort(function (a, b) {
        return a > b ? 1 : -1
    })
}
class OTabs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visibleList: [],
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
        const list = sortACS(selectkeys)
        this.props.onConfirm && this.props.onConfirm(list)
        this.setState({
            visibleList:list
        })
    }

    concatTabsItem = (list) => {
        let {prefixCls, addTabsItemText,dropdownContainer, children, nextCnt,dropdownStyle} = this.props
        const visibleList = list

        const menuItems = [];
        !Array.isArray(children) && (children = [children])
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


        dropdownContainer = dropdownContainer ? dropdownContainer : function () {return document.body}

        if (!!addTabsItemText) {
            nextCnt = <Dropdown
                trigger={['click']}
                overlay={menu}
                multiple
                selectedKeys={list}
                dropdownStyle={dropdownStyle}
                onConfirm={this.handlerDropdownConfirm}
                uniqueSelect
                getPopupContainer ={()=>dropdownContainer()}
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

        return _children
    }

    initVisibleList = () => {
        let visibleList = []
        let children = this.props.children
        !Array.isArray(children) && (children = [children])

        children.forEach((item,index)=> !!!item.props.hidden && visibleList.push(index.toString()))

        return sortACS(visibleList)
    }

    componentWillMount() {

        const visibleList = this.initVisibleList()
        this.setState({
            visibleList:visibleList
        })
    }



    render() {
        let {prefixCls,  title, ...props} = this.props;

        let classNames = classnames({
            [prefixCls]: !!title,
            [prefixCls + '--small']: this.props.type == "card" && this.props.size == "small"
        })

        const newChildren = this.concatTabsItem(this.state.visibleList)

        return (
            <Tabs
                {...props}
                className={classNames}
            >
                {newChildren}
            </Tabs>
        )
    }
}

OTabs.TabPane = TabPane;

export default OTabs