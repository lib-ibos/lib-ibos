/**
 * Created by Administrator on 2016/11/1 0001.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom';

import {Row, Col, Form, Input, Button, Select, Icon, Collapse, Menu,Badge, Table, Radio} from 'antd';

import {Panel, FormLayout, MultiColSelect as RichSelect, Split, Tabs, ScrollContainer, Steps, Wrap} from 'ibos'
const FormItem = FormLayout.FormItem;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Tag from 'ibos/tag'

const Step = Steps.Step;
const TabsPane = Tabs.TabPane;

const Option = Select.Option;

import Mock from 'mockjs'


let data = {}
function setData(){
    data = Mock.mock({
        'list|15-50': [{
            'key|+1': 0,
            'xinyu|1-5': '★',
            'email': '@email(olytech.com)',
            // 'url': '@url(http,olymtech.com)',
            'address': '@city',
            'date1': '@date',
            'age|20-35': 1,
            'time1': '@time(HH:mm)',
            fulltime: '@date1 @time1',
            name: '@cname',
            action: '详情',
        }]
    }).list
}


setData()


// 输出结果
// console.log(JSON.stringify(data,null,4))

let columns = [{
    title: '时间',
    dataIndex: 'fulltime',
    render: text => {
        let date = text.split(' ');
        return <span>{date[0]} {date[1]}</span>
    }
}, {
    title: '姓名',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: '年龄',
    dataIndex: 'age'
}, {
    title: '住址',
    dataIndex: 'address',
}, {
    title: 'Email',
    dataIndex: 'email',
    render: text => <FormItem validateStatus="error" help="请选择正确日期"><Input size="small" defaultValue={text}/></FormItem>
}, {
    title: '信誉',
    dataIndex: 'xinyu'
}, {
    title: '操作',
    dataIndex: 'action',
    render: text => <a href="text">{text}</a>
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        data[selectedRowKeys].age = 44

        console.log(data[selectedRowKeys].age)

    },
    onSelect(record, selected, selectedRows) {
        // console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
    },
};

export default class list extends Component {

    constructor() {
        super()
        this.state = {
            batchButtonDisabled:true,
            data:data
        }
    }

    handlerRowClick = (record,index) =>{
        data[index].age = 66
        console.log(data[index])
    }

    render() {
        return (
            <Wrap>
                <Panel>
                    <Tabs type="card" size="small" defaultActiveKey="2" title="用户列表" onChange={()=>setData(this)}>
                        <TabsPane tab="全部" key="1" ></TabsPane>
                        <TabsPane tab={<span>待审核 <span className="ml4 color-warning">11</span></span>} key="2"></TabsPane>
                        <TabsPane tab='已审核' key="3"></TabsPane>
                    </Tabs>
                    <FormLayout inputSize="small">
                        <FormItem validateStatus="success" help="请选择正确日期"><Input placeholder="askdjf"/></FormItem>
                        <FormItem validateStatus="warning" help="请选择正确日期"><Input placeholder="askdjf"/></FormItem>
                        <FormItem validateStatus="error" help="请选择正确日期"><Input placeholder="askdjf"/></FormItem>
                        <FormItem validateStatus="validating" help="请选择正确日期"><Input placeholder="askdjf"/></FormItem>
                    </FormLayout>
                </Panel>
                <Panel>
                    <Button type='primary'>新增</Button>
                    <Button>删除</Button>
                    <Button disabled={this.state.batchButtonDisabled}>批量操作</Button>
                    <Split space/>
                    <FormLayout>
                    <Table onRowClick={this.handlerRowClick} rowSelection={rowSelection} size="default" dataSource={this.state.data} columns={columns}/>
                    </FormLayout>
                </Panel>
            </Wrap>
        );
    }
}