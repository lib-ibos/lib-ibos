import React, {Component} from 'react'
import {render}  from 'react-dom';

import { Tabs,Table,Row,Col,Dropdown,Input ,Menu } from 'Antd';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import Panel from '../../components/Panel/index';
import MultiColSelect from '../../components/MultiColSelect-bak/';
import RichSelect from '../../components/MultiColSelect/';
import SettingBar from '../settingBar/settingBar';
import Footer from '../footer/footer';
//style
import './layout.less';

const columns = [
    { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: '列1', dataIndex: 'address', key: '1', width: 150 },
    { title: '列2', dataIndex: 'address', key: '2', width: 150 },
    { title: '列3', dataIndex: 'address', key: '3', width: 150 },
    { title: '列4', dataIndex: 'address', key: '4', width: 150 },
    { title: '列5', dataIndex: 'address', key: '5', width: 150 },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="#">操作</a>,
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `李大嘴${i}`,
        age: 32,
        address: `西湖区湖底公园${i}号`,
    });
}


function App() {
    return <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />;
}

class Layout extends Component{

    toggleSettingBar=(type)=>{
        this.refs.layoutSettingBar.toggleEnable(type)
    }

    test =(data)=>{
        console.log(data)
    }

    change=()=>{
        return {
            head: [
                {
                    dataIndex: "code",
                    title: "代码"
                },
                {
                    dataIndex: "name",
                    title: "公司名称"
                }
            ],
            body: [
                {
                    value: "343",
                    code: "343",
                    name: '阿三地方就阿喀琉斯大家非可视对讲肯德基非可视对讲发',
                },
                {
                    value: "45986",
                    code: "45986",
                    name: '阿斯顿发生的发顺丰打算士大夫',
                }
            ]
        }
    }

    render(){
        return (
            <div className="layout">
                <Header settingBarHandle={this.toggleSettingBar.bind(this)}/>
                <Sidebar/>
                <div className="layout__content">
                    <Panel title="我是 Panel 标题">
                        <a onClick={() => this.toggleSettingBar('show')}>show</a> -
                        <a onClick={() => this.toggleSettingBar('hide')}>hide</a> -
                        <a onClick={this.toggleSettingBar}>toggle</a>
                    </Panel>
                    <Row>
                        <Col span={12}>
                            <Panel title="我没有背景色" isTransparent={true}>
                                我是一个没有背景的panel，用于放在有底色的容器中
                            </Panel>
                        </Col>
                        <Col span={12}>
                            <Panel title="textarea" noHeaderBd={true}>
                                <MultiColSelect placeholder="五字码" />
                            </Panel>
                        </Col>
                    </Row>
                    <Panel title="我是 Panel 标题">
                            <RichSelect selectKey="name" placeholder="请输入文本" onCustomSelect={this.test} onChange={this.change} />
                            <RichSelect type="textarea" row="5" onChange={this.change} />
                    </Panel>
                    <Panel>
                        <Tabs defaultActiveKey="2" size="small">
                            <Tabs.TabPane tab="设置" key="1">选项卡一内容</Tabs.TabPane>
                            <Tabs.TabPane tab="选择皮肤" key="2">选项卡二内容</Tabs.TabPane>
                            <Tabs.TabPane tab="选项卡三" key="3">选项卡三内容</Tabs.TabPane>
                        </Tabs>
                    </Panel>

                    <Panel>
                        <App/>
                    </Panel>
                    <Footer/>
                </div>
                <SettingBar ref="layoutSettingBar"  />
            </div>
        )
    }
}



export default Layout;