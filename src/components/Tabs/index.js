import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';
import classnames  from 'classnames';
// import RcTabs , { TabPane } from 'rc-tabs'
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import {Tabs} from 'antd'
const RcTabs = Tabs
const TabPane = Tabs.TabPane

//style
import './styles/';


class OTabs extends Component {

    static defaultProps = {
        prefixCls: 'o-tabs',
    }

    render() {
        let {prefixCls, children,nextCnt,  title,  ...props} = this.props;
        let titlePane = !!title && <TabPane tab={title} disabled={true} key="__ttile"></TabPane>
        let nextPane = !!nextCnt && <TabPane tab={<span className={prefixCls +'__next'}>{nextCnt}</span>} disabled={true} key="__fn"></TabPane>
        !!title && children.unshift(titlePane)
        !!nextCnt && children.push(nextPane)

        let classNames = classnames({
            [prefixCls]: !!title,
            [prefixCls + '--small']: this.props.type == "card" && this.props.size == "small"
        })
        // console.log(children )
        return (
            <RcTabs
                {...props}
                className={classNames}
            >
                {children}
            </RcTabs>
        )
    }
}

OTabs.TabPane = TabPane;

export default OTabs