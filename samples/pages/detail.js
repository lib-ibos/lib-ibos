/**
 * Created by Administrator on 2016/11/1 0001.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom';

import {Row, Col, Form, Input, Select, Checkbox,DatePicker,Switch,Table } from 'antd';
import {Panel,FormLayout,MultiColSelect as RichSelect,Split,Tabs} from 'ibos'

const FormItem = FormLayout.FormItem;

const TabPane = Tabs.TabPane;

const Option = Select.Option;
const dataSource = [{
    key: '1',
    age: 32,
    name:"asdfkj",
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
    render:()=>
        <RichSelect dropdwonMaxRows={6}   rows={4} autosize={{ minRows: 2, maxRows: 6 }} dataHeader={data.head} dataBody={data.body} />
}, {
    title: '唛头',
    dataIndex: 'age',
    key: 'age',
    render:()=><Select>
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

function setData() {
    let resolve,reject;
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

    const promise = new Promise((rs,rj)=>{
        resolve = rs;
        reject = rj;
    })

    setTimeout(function () {
        resolve(data)
    },300)

    return promise

}


class TestInput extends Component{
    render(){
        return(
            <Input {...this.props} />
        )
    }
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

class Detail extends Component {

    wokao =(e)=>{
        console.log(e)
    }

    render() {
        console.log("rendered")
        return (

            <Panel>


                <FormLayout inputSize="small"  labelWidth="4em" inputType="text">
                    <Row>
                        <Col span={8}>
                            <FormItem label="工作编号">
                                <RichSelect dropdwonMaxRows={6}  onSelect={this.wokao}  rows={4} autosize={{ minRows: 2, maxRows: 6 }} dataHeader={data.head} dataBody={data.body} {...this.props.form.getFieldProps("abc",{initialValue:"213123" ,onChange: v => console.log(v)})}/>
                            </FormItem>
                        </Col>
                    </Row>
                </FormLayout>
                        <FormLayout inputSize="small"  labelWidth="4em" >


                            <Row>
                                <Col span={5}>
                                    <FormItem label="工作编号">
                                        <RichSelect dropdwonMaxRows={6}  onSelect={this.wokao}  rows={4} autosize={{ minRows: 2, maxRows: 6 }} dataHeader={data.head} dataBody={data.body} {...this.props.form.getFieldProps("abc",{initialValue:"213123" ,onChange: v => console.log(v)})}/>
                                </FormItem>
                                </Col>

                                <Col span={5}>
                                    <FormItem label="委托编号">
                                        <TestInput  {...this.props.form.getFieldProps("abc2",{initialValue:"213123" })}/>
                                    </FormItem>
                                </Col>

                                <Col span={5}>
                                    <FormItem label="出运类型">
                                        <Select ref="select" showSearch {...this.props.form.getFieldProps("a1bc",{initialValue:"213123" })} >
                                            <Option key="1">asdfasdf</Option>
                                            <Option key="2">34234234</Option>
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
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="委托日期">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem  label="是否退关">
                                        <Switch size="small" />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>
                                    <FormItem label="MB/L NO">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="HB/L NO">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="S/O NO">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="业务来源">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem  label="进口/出口">
                                        <Select/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className="split-container">
                                <Col span={24}>
                                    <FormItem label="增值服务">
                                        <Checkbox className="ant-checkbox-inline">订舱</Checkbox>
                                        <Checkbox className="ant-checkbox-inline">拖车</Checkbox>
                                        <Checkbox className="ant-checkbox-inline">报关</Checkbox>
                                        <Checkbox className="ant-checkbox-inline">仓储</Checkbox>
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormLayout>

                <Tabs defaultActiveKey="1" >
                    <TabPane tab="订舱信息" key="1">
                        <FormLayout inputSize="small"  labelWidth="4em">

                        <Row>
                            <Col span={7}>
                                <FormItem label="委托单位">
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem label="联系备注">
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem label="合同号">
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem label="业务员">
                                    <Input />
                                </FormItem>
                            </Col>
                        </Row>
                            <Row>
                                <Col span={7}>
                                    <FormItem label="订舱代理">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem label="联系备注">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="船司约号">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="部门分组">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>

                            <Split type="dashed" />
                            <Row>
                                <Col span={7}>
                                    <FormItem label="发货人" labelVertical={true}>
                                        <RichSelect type="textarea" rows={4}  />
                                    </FormItem>
                                    <FormItem label="收货人" labelVertical={true}>
                                        <RichSelect type="textarea" rows={4}  />
                                    </FormItem>
                                    <FormItem label="通知人" labelVertical={true}>
                                        <RichSelect type="textarea" rows={4}  />
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem label=" " required labelWidth="2em">
                                        <Input />
                                    </FormItem>
                                    <Row gutter={4}>
                                        <Col span={12}>
                                            <FormItem label="起运港">
                                                <RichSelect />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem>
                                                <Input />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={4}>
                                        <Col span={12}>
                                            <FormItem label="目的港">
                                                <RichSelect />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem>
                                                <Input />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={4}>
                                        <Col span={12}>
                                            <FormItem label="目的地">
                                                <RichSelect />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem>
                                                <Input />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={4}>
                                        <Col span={12}>
                                            <FormItem label="中转港">
                                                <RichSelect />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem>
                                                <Input />
                                            </FormItem>
                                        </Col>

                                    </Row>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="付款方式">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                    <FormItem label="交货地点">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormLayout>
                        <Split space/>
                        <Table size="small" pagination={false} dataSource={dataSource} columns={columns} bordered />
                        <Split space/>
                        <FormLayout inputSize="small">
                            <Col span={4}>
                                <FormItem label="交货地点">
                                    <Input disabled value="adasdf" />
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem label="交货地点">
                                    <Input readOnly/>
                                </FormItem>
                            </Col>
                        </FormLayout>
                    </TabPane>
                    <TabPane tab="装箱信息" key="2">
                        <Table size="small" pagination={false} dataSource={dataSource} columns={columns} bordered />
                        <Split type="space"/>
                        <FormLayout inputSize="small"  labelWidth="4em">
                            <Row>
                                <Col span={5}>
                                    <FormItem label="箱号" >
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="封号">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="箱属">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem label="香型">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <FormItem label="已提箱">
                                                <Switch size="small" />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem >
                                                <DatePicker />
                                            </FormItem>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} >
                                    <FormItem label="件数">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="毛重">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="体积">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem label="装箱方式">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <FormItem label="已提箱">
                                                <Switch size="small" />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem >
                                                <DatePicker />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} >
                                    <FormItem label="箱号">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem label="包装备注">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem label="码头">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <FormItem label="码头">
                                                <Switch size="small" />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem >
                                                <DatePicker />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10} >
                                    <FormItem label="车队">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={14}>
                                    <FormItem label="仓库">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} >
                                    <FormItem label="司机">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="手机">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem label="车牌">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={9}>
                                    <FormItem label="仓库联系信息" labelWidth="6em">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={15} >
                                    <FormItem label="费收备注">
                                        <Input type="textarea" rows={1} autosize />
                                    </FormItem>
                                </Col>
                            </Row>

                            <Panel title="门点信息 " noPadding={true}>
                                <Row>
                                    <Col span={15} >
                                        <FormItem label="费收备注">
                                            <Input type="textarea" rows={1} autosize />
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Panel>
                            </FormLayout>
                    </TabPane>
                    <TabPane tab="报关信息" key="3">
                        23123
                    </TabPane>
                    <TabPane tab="反恐信息/冷危信息" key="4">
                        231231111111111
                    </TabPane>
                </Tabs>
            </Panel>
        );
    }
}

export default Form.create()(Detail);