import React, {Component} from 'react'
import {render}  from 'react-dom';
import { Tabs  } from 'antd';
import classnames  from 'classnames';

import Panel from 'ibos/Panel'
//style
import './settingBar.less';

class SettingBar extends Component{
    constructor(props){
        super(props)
        this.state ={
            enable:false
        }
    }

    toggleEnable = (type) =>{
        var stateType = false;
        switch (type){
            case "show":
                stateType = true;
                break;
            case "hide":
                stateType = false;
                break;
            default:
                stateType = !this.state.enable;
        }
        this.setState({
            enable:stateType
        })
    }

    render(){
        return (
            <div className={classnames("layout__setting-bar",{"enable":this.state.enable})}>
                <Panel title="设置" isTransparent={true}>
                    <Tabs defaultActiveKey="2" size="small">
                        <Tabs.TabPane tab="设置" key="1">选项卡111一内容</Tabs.TabPane>
                        <Tabs.TabPane tab="选择皮肤" key="2">选项卡二内容</Tabs.TabPane>
                        <Tabs.TabPane tab="选项卡三" key="3">选项卡三内容</Tabs.TabPane>
                    </Tabs>
                    <a href="#" onClick={this.toggleEnable}>close</a>


                </Panel>
            </div>
        );
    }
}

export default SettingBar;