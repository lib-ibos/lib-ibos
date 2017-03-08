/**
 * Created by Administrator on 2016/11/1 0001.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom';

import {Row, Col, Form, Input,Button, Select,Icon,Collapse ,Menu,Table,Radio} from 'antd';
import Panel from '../../src/components/Panel/'
import FormLayout from '../../src/components/FormLayout/'
const FormItem = FormLayout.FormItem;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Tag from '../../src/components/tag'


import RichSelect from '../../src/components/MultiColSelect/'
import Split from '../../src/components/Split/'
import Tabs from '../../src/components/Tabs/'
import ScrollContainer from '../../src/components/ScrollContainer/'
import Dropdown from '../../src/components/Dropdown/'
import Steps from '../../src/components/Steps/'
const Step = Steps.Step;
const TabPane = Tabs.TabPane;

const Option = Select.Option;



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
    address: <span><Tag color="green">指</Tag>'111西湖区湖底公园1号'</span>,
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: <span><Tag hasTag><Tag color="green" size="mini">指</Tag>MSK</Tag><Tag hasTag>COSCO</Tag><Tag hasTag>COSCO</Tag><Tag hasTag>COSCO</Tag><Tag hasTag>COSCO</Tag><Tag hasTag>COSCO</Tag><Tag hasTag>COSssds dsdsCO</Tag></span>,
}, {
    key: '3',
    name: '李大嘴',
    age: 32,
    address: <span><Tag color="green" size="small">指</Tag>'111西湖区湖底公园1号'</span>,
}];


class crmHome extends Component {


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

                            <Row>
                                <Col offset={4} span={16}>
                                    <Input.Group className="ant-search-input">
                                        <Input placeholder="委托单位" />
                                        <div className="ant-input-group-wrap">
                                            <Button type="primary" className="ant-search-btn">搜索</Button>
                                        </div>
                                    </Input.Group>
                                </Col>
                            </Row>
                            <Split space/>

                            <Collapse defaultActiveKey={['1']} accordion>
                                <Collapse.Panel header="安慰轻工国际贸易股份有限公司" key="1">
                                    <Row gutter={16} >
                                        <Col span="8" >
                                            <Row>
                                                <Col span="3">
                                                    <span className="img-icon img-icon__kong"></span>
                                                </Col>
                                                <Col span="21">
                                                    <p >目的港:LOS ANGULSES</p>
                                                    <p className="color-gray mt4">APL / 3截5开</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span="16">
                                            <Panel gray style={{marginBottom:0}} bodyStyle={{padding:'8px',paddingBottom:0}}>
                                                <Steps size="small" current={1} labelPlacement="vertical" transparent>
                                                    <Step title="已完成" />
                                                    <Step title="进行中" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                </Steps>
                                            </Panel>
                                        </Col>
                                    </Row>

                                </Collapse.Panel>
                                <Collapse.Panel header="安慰轻工国际贸易股份有限公司" key="2">
                                    <Row gutter={16} >
                                        <Col span="8" >
                                            <Row>
                                                <Col span="3">
                                                    <span className="img-icon img-icon__pin"></span>
                                                </Col>
                                                <Col span="21">
                                                    <p >目的港：LOS ANGULSES</p>
                                                    <p className="color-gray mt4">APL / 3截5开</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span="16">
                                            <Panel gray style={{marginBottom:0}} bodyStyle={{padding:'8px',paddingBottom:0}}>
                                                <Steps size="small" current={1} labelPlacement="vertical" transparent>
                                                    <Step title="已完成" />
                                                    <Step title="进行中" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                    <Step title="待运行" />
                                                </Steps>
                                            </Panel>
                                        </Col>
                                    </Row>
                                </Collapse.Panel>
                            </Collapse>

                        </Panel>
                    </Col>
                    <Col span={12}>
                        <Panel>
                            <Tabs
                                title="应收款"
                                size="small"
                                type="card"
                            >

                                <TabPane tab="我的应收款" key="1" >
                                    <RadioGroup defaultValue="a" size="middle">
                                        <RadioButton value="a">费用待确认（12）</RadioButton>
                                        <RadioButton value="b">账期内应收（23）</RadioButton>
                                        <RadioButton value="c">超期应收（12）</RadioButton>
                                        <RadioButton value="d">付款买单（33）</RadioButton>
                                    </RadioGroup>
                                    <Split space/>
                                    <Table  columns={columns1} dataSource={data1} size="small"  pagination={false}/>

                                </TabPane>
                                <TabPane tab="团队应收款" key="2" >团队应收款</TabPane>
                            </Tabs>
                        </Panel>
                        <Panel
                            title="我的销售情况"
                            fn={<Button.Group size="small">
                                <Button >本月<Icon type="down" /></Button>
                                <Button >离岗日期<Icon type="down" /></Button>
                            </Button.Group>}
                        >
                            <FormLayout inputSize="small"  labelWidth="4em">

                                <Table  columns={columns1} dataSource={data1} size="small"  pagination={false}/>

                                <Row className="mt8">
                                    <Col span={12} className='fs16'>
                                        总计
                                    </Col>
                                    <Col span={12} className='tar fs16 '>
                                        毛利：￥3843 $9458
                                    </Col>

                                </Row>
                    </FormLayout>
                        </Panel>
                    </Col>
                </Row>

            </div>

        );
    }
}

export default crmHome;