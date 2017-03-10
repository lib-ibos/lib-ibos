/**
 * Created by Administrator on 2016/11/1 0001.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom';

import {Row, Col, Form, Input, Button, Select, Icon, Collapse, Menu, Table, Radio, DatePicker, Checkbox} from 'antd';
import Panel from '../../src/components/Panel/'
import FormLayout from '../../src/components/FormLayout/'
const FormItem = FormLayout.FormItem;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


import Split from '../../src/components/Split/'
import Tabs from '../../src/components/Tabs/'
import ScrollContainer from '../../src/components/ScrollContainer/'
import Dropdown from '../../src/components/Dropdown/'
import Steps from '../../src/components/Steps/'
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const options = [
    {label: '苹果', value: 'Apple'},
    {label: '梨', value: 'Pear'},
    {label: '橘', value: 'Orange'},
];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    render(text) {
        return <a href="#">{text}</a>;
    },
}, {
    title: '年龄',
    dataIndex: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `李大嘴${i}`,
        age: 32,
        address: `西湖区湖底公园${i}号`,
    });
}
const pagination = {
    total: data.length,
    showSizeChanger: true,
    onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange(current) {
        console.log('Current: ', current);
    },
};
class crmDetail extends Component {

    render() {
        let childreno = [];
        for (let i = 10; i < 36; i++) {
            childreno.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }


        return (
            <Panel>
                <FormLayout inline>
                    <FormItem label="当前业务票数" labelWidth="6em">
                        <p className="dpib vam"><span className="color-warning fwb">0</span> 票</p>
                    </FormItem>
                    <Split vertical/>
                    <FormItem label="总应收款">
                        <p className="dpib vam">RMB <span className="color-warning fwb pr8">0</span> USD <span
                            className="color-warning fwb">0</span></p>
                    </FormItem>
                    <Split vertical/>
                    <FormItem label="超期应收款">
                        <p className="dpib vam">RMB <span className="color-warning fwb pr8">0</span> USD <span
                            className="color-warning fwb">0</span></p>
                    </FormItem>
                </FormLayout>
                <Split space/>
                <Tabs type="card" defaultActiveKey="3">
                    <TabPane tab="基础资料" key='1'>
                        <Button className="mr6" onClick={this.editForm}>修改资料</Button>
                        <Button onClick={this.editForm}>评审</Button>
                        <Split space/>
                        <Row gutter={48}>
                            <Col span="8">
                                <FormLayout inputSize="small" inputType="text">
                                    <FormItem label="潜在客户">
                                        <Input value="test dkd"/>
                                    </FormItem>
                                    <FormItem label="总应收款">
                                        <DatePicker showTime format="yyyy-MM-dd HH:mm"/>
                                    </FormItem>
                                    <FormItem label="超期应收款">
                                        <Input/>
                                    </FormItem>
                                </FormLayout>
                            </Col>
                            <Col span="8">
                                <FormLayout inputSize="small" inputType="text">
                                    <FormItem label="潜在客户">
                                        <Input/>
                                    </FormItem>
                                    <FormItem label="总应收款">
                                        <Input/>
                                    </FormItem>
                                    <FormItem label="超期应收款">
                                        <CheckboxGroup options={options} defaultValue={['Pear', 'Apple']}/>
                                    </FormItem>
                                </FormLayout>
                            </Col>
                            <Col span="8">
                                <FormLayout inputSize="small" inputType="text">
                                    <FormItem label="评审状态">
                                        <Input value="哈哈哈哈" disabled/>
                                    </FormItem>
                                    <FormItem label="评审备注">
                                        <Input type="textarea"/>
                                    </FormItem>
                                    <Split/>
                                    <h4>银行账户</h4>
                                        <FormItem label="人民币账户">
                                            <Input t/>
                                        </FormItem>
                                        <FormItem label="人民币银行">
                                            <Input />
                                        </FormItem>
                                        <FormItem label="美金账户">
                                            <Input t/>
                                        </FormItem>
                                        <FormItem label="美金银行">
                                            <Input />
                                        </FormItem>
                                    <Split/>
                                    <FormItem label="一般纳税人">
                                        <RadioGroup defaultValue={"a"}>
                                            <Radio key="a" value={"a"}>是</Radio>
                                            <Radio key="b" value={"b"}>否</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="一般纳税人">
                                        <RadioGroup defaultValue={1}>
                                            <Radio key="a" value={1}>是</Radio>
                                            <Radio key="b" value={2}>否</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </FormLayout>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="联系人" key='2'>
                        asdfasdfa111111
                    </TabPane>
                    <TabPane tab="作业要求" key='3'>
                        <FormLayout inputSize="small" inline>

                            <FormItem label="人民币账户">
                                <Input t/>
                            </FormItem>
                            <FormItem label="人民币银行">
                                <Input />
                            </FormItem>
                            <FormItem label="美金账户">
                                <Input t/>
                            </FormItem>
                            <FormItem label="美金银行">
                                <Input />
                            </FormItem>
                                <Button size="small" >搜索</Button>
                        </FormLayout>
                        <Split dashed/>

                        <Button className="mr6" type="primary">新增</Button>
                        <Button>删除</Button>
                        <Split space/>
                        <Table columns={columns} dataSource={data} pagination={pagination} size="middle" />
                    </TabPane>
                    <TabPane tab="协议管理" key='4'>
                        asdfasdfa111111
                    </TabPane>
                </Tabs>
            </Panel>

        );
    }
}

export default crmDetail;