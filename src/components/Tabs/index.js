import React, {Component} from 'react';
import ReactDOM,{render}  from 'react-dom';
import classnames  from 'classnames';
// import RcTabs , { TabPane } from 'rc-tabs'
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import {Tabs} from 'antd'
const RcTabs = Tabs
const TabPane = Tabs.TabPane

//style
import './styles/';


class OTabs extends Component{

    render(){
        let {children,type,title,...props} = this.props;
        let titlePane = title && <TabPane tab={title} disabled={true}  key="__ttile" ></TabPane>
        title && children.unshift(titlePane)

        let classNames = classnames({
            ['o-tabs']: !!title
        })
        // console.log(children )
        return(
            <RcTabs
                {...props}
                className={classNames}
                type={title? 'card' : type}
            >
                {children}
            </RcTabs>
        )
    }
}

OTabs.TabPane = TabPane;

export default OTabs