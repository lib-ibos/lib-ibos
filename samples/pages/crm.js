/**
 * Created by Administrator on 2016/11/1 0001.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom';

import {Row, Col, Form, Input,Button, Select,Icon ,Menu,Table} from 'antd';
import Panel from '../../src/components/Panel/'
import FormLayout from '../../src/components/FormLayout/'
const FormItem = FormLayout.FormItem;
import Text from '../../src/components/text'



import RichSelect from '../../src/components/MultiColSelect/'
import Split from '../../src/components/Split/'
import Tabs from '../../src/components/Tabs/'
import ScrollContainer from '../../src/components/ScrollContainer/'
import Dropdown from '../../src/components/Dropdown/'
const TabPane = Tabs.TabPane;

const Option = Select.Option;
const dataSource = [{
    key: '1',
    age: 32,
    name: "asdfkj",
    address: 'Tabledsf'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '品名',
    dataIndex: 'name',
    key: 'name',
    render: () =>
        <RichSelect dropdwonMaxRows={6} rows={4} autosize={{minRows: 2, maxRows: 6}} dataHeader={data.head}
                    dataBody={data.body}/>
}, {
    title: '唛头',
    dataIndex: 'age',
    key: 'age',
    render: () => <Select>
        <Option key="3">23123</Option>
        <Option key="a3">23123</Option>
        <Option key="vf3">23123</Option>
        <Option key="df3">23123</Option>
        <Option key="c3">23123</Option>
        <Option key="q3">23123</Option>
        <Option key="w3">23123</Option>
        <Option key="e3">23123</Option>
        <Option key="r3">23123</Option>
        <Option key="qw3">23123</Option>
        <Option key="we3">23123</Option>
        <Option key="qe3">23123</Option>
        <Option key="fg3">23123</Option>
        <Option key="h3">23123</Option>
        <Option key="j3">23123</Option>
    </Select>
}, {
    title: '件数',
    dataIndex: 'address',
    key: 'address',
}];


let columns1 = [{
    title: '姓名',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: '年龄',
    dataIndex: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
}];
let data1 = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
}, {
    key: '3',
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园1号',
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
    },
};

function setData() {
    let resolve, reject;
    let data = {
        head: [
            {
                dataIndex: "code",
                title: "代111码"
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
            },
            {
                value: "asss",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "adfadf",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "adf",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "45x986",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "45f986",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "d45986",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "4598d6",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            },
            {
                value: "4a5986",
                code: "45986",
                name: '阿斯顿发生的发顺丰打算士大夫',
            }
        ]
    }

    const promise = new Promise((rs, rj) => {
        resolve = rs;
        reject = rj;
    })

    setTimeout(function () {
        resolve(data)
    }, 300)

    return promise

}


let data = {
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
        },
        {
            value: "asss",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "adfadf",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "adf",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "45x986",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "45f986",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "d45986",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "4598d6",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        },
        {
            value: "4a5986",
            code: "45986",
            name: '阿斯顿发生的发顺丰打算士大夫',
        }
    ]
}
const menu = (
    <Menu>
        <Menu.Item key="0">第一个菜单项</Menu.Item>
        <Menu.Item key="1">第二个菜单项</Menu.Item>
        <Menu.Item key="2">第三个菜单项</Menu.Item>
    </Menu>
);

const menu2 = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">2222第一个菜单项</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">第二个菜单项</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">第三个菜单项</Menu.Item>
    </Menu>
);
class Crm extends Component {

    handerChangeTable=()=>{

        columns1 = [{
            title: '姓名111111',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '年龄',
            dataIndex: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
        }];
        data1 = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }, {
            key: '3',
            name: '李大嘴',
            age: 32,
            address: '西湖区湖底公园1号',
        }];
    }

    render() {
        let childreno = [];
        for (let i = 10; i < 36; i++) {
            childreno.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }


        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Panel title="我的业务">
                            当前<Text color="warning" weight="bold" align="right" margin={{left:"min",right:"normal",top:'large'}} width="200px" height="100px" >111</Text>KG



                        </Panel>
                    </Col>
                    <Col span={12}>
                        <Panel>
                            <Tabs
                                title="应收款"
                                size="small"
                                addTabsItemText="设置"
                                type="card"
                            >

                                <TabPane tab="我的应收款" key="1" >
                                    <Button onClick={this.handerChangeTable}>change</Button>
                                    <Table rowSelection={rowSelection} columns={columns1} dataSource={data1} />

                                    <Panel
                                        title="运费条款"
                                        fn={<a>+ 添加条款</a>}
                                        noPadding
                                        noHeaderBorder
                                        fnInline
                                        bodyStyle={{paddingBottom:0}}
                                    >
                                        <Panel
                                            gray
                                            title="DDU"
                                            noHeaderBorder
                                        >
                                            <Dropdown
                                                overlay={menu}
                                                trigger={['click']}
                                                multiple
                                                onConfirm={function (e) {
                                                    console.log(e)
                                                }}
                                            >
                                                <a className="ant-dropdown-link" href="#">
                                                    点击触发 <Icon type="down"/>
                                                </a>
                                            </Dropdown>
                                        </Panel>

                                        <Panel
                                            gray
                                            title="DDU"
                                        >
                                            <Dropdown overlay={menu2} trigger={['hover']} >
                                                <a className="ant-dropdown-link" href="#">
                                                    点击触发 <Icon type="down"/>
                                                </a>
                                            </Dropdown>
                                        </Panel>

                                    </Panel>
                                </TabPane>
                                <TabPane tab="团队应收款" key="2" hidden={true} >团队应收款</TabPane>
                            </Tabs>
                        </Panel>
                        <Panel
                            title="我的业绩"
                        >
                            <FormLayout inputSize="small"  labelWidth="4em">

                        <Row>
                            <Col span={12}>
                                <FormItem label="委托编号">
                                    <Input value="haha" />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="委托编号" >
                                    <Input  />
                                </FormItem>
                            </Col>
                        </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="委托编号" readOnly={true}>
                                            <Input value="hah1111a"/>
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="委托编号" >
                                            <Input  />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="委托编号" type="text" >
                                            <Input value="hahaasdfa sdfasdfa adfasdfasdfasdfasdf" disabled />
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="委托编号" >
                                            <Input value="haha" />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="委托编号">
                                            <Input value="haha" disabled />
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                       11
                                    </Col>
                                </Row>
                    </FormLayout>
                        </Panel>
                    </Col>
                </Row>
                <Panel>
                <ScrollContainer tabsTitle="哈哈" addTabsItemText="sdkfjskjd">
                    <div tab="选项卡一" key="1">
                        <Panel title="1111111111" noPadding>
                        <p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>
                        </Panel>
                    </div>
                    <div tab="选项卡二" key="2" hidden={true}>
                        <Panel title="222222222222" noPadding>
                            <p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>
                        </Panel>
                    </div>
                    <div tab="选项卡三" key="3">
                        <Panel title="33333333333" noPadding>
                            <p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>
                        </Panel>
                    </div>
                </ScrollContainer>
                </Panel>
            </div>

        );
    }
}

export default Crm;