/**
 * Created by Administrator on 2016/11/1 0001.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom';

import {Row, Col, Form, Input, Select, Checkbox, Radio, DatePicker, Switch, Table, Button, Upload, Icon} from 'antd';
import {Panel, FormLayout, Split, SplitContainer} from 'ibos'
const RadioGroup = Radio.Group;
const FormItem = FormLayout.FormItem;

const Option = Select.Option;
const dataSource = [{
  key: '1',
  name: "哈哈哈",
  time: '2017-12-12'
}, {
  key: '2',
  name: '胡彦祖',
  time: '2017-12-12'
}];

const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'http://www.baidu.com/xxx.png',
}]

const columns = [{
  title: '#',
  render: (text, record, index) => index + 1
}, {
  title: '附件',
  dataIndex: 'attache',
  key: 'attache',
  render: () =>
    <FormLayout inputSize="small">
      <FormItem >
        <Upload className="dpib vam" fileList={fileList}>
        </Upload>
      </FormItem>
    </FormLayout>
}, {
  title: '创建人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '创建时间',
  dataIndex: 'time',
  key: 'time',
}];


class Detail extends Component {

  render() {
    console.log("rendered")
    return (

      <div>
        <Panel small>
          <FormLayout inputSize="small" labelWidth="5em">
            <Row gutter={8}>
              <Col span={5}>
                <FormItem label="往来单位">
                  <Select size="small"/>
                </FormItem>
              </Col>

              <Col span={5}>
                <FormItem label="合同编号">
                  <Input />
                </FormItem>
              </Col>

              <Col span={4}>
                <FormItem label="合同维护人">
                  <Select size="small">
                    <Option key="1">asdfasdf</Option>
                    <Option key="2">34234234</Option>
                    <Option key="3">23123</Option>
                    <Option key="a3">23123</Option>
                  </Select>
                </FormItem>
              </Col>

            </Row>
            <Row gutter={8}>
              <Col span={5}>
                <FormItem label="合同有效期">
                  <Input />
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem label="终止时间">
                  <DatePicker />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="状态">
                  <span className="color-warning">草稿</span>
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem>
                  <Button size="small">生效</Button>
                  <Button size="small">终止</Button>
                  <Button size="small">作废</Button>
                  <Button size="small">删除</Button>
                </FormItem>
              </Col>
            </Row>
          </FormLayout>
        </Panel>
        <Panel title={<Checkbox className="ant-checkbox-inline">收款条款</Checkbox>} small>
          <FormLayout inputSize="small">
            <Row>
              <Col span={4}>
                <FormItem label='结算周期'>
                  <Select size="small">
                    <Option key="1">asdfasdf</Option>
                    <Option key="2">34234234</Option>
                    <Option key="3">23123</Option>
                    <Option key="a3">23123</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={20}>
                <RadioGroup >
                  <FormItem label='结算日'>
                    <Radio key="a" value={1}>每月</Radio>

                    <Select size="small" className='w60 mr16'>
                      <Option key="1">15号</Option>
                    </Select>

                    <Radio key="b" value={2}>每结算划分日+</Radio> <Input className='w60'/> 天
                  </FormItem>
                </RadioGroup>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label='结算划分日'>
                  <RadioGroup >
                    <Radio key="a" value={1}>按业务</Radio>
                    <Radio key="b" value={2}>按对账日期</Radio>
                    <Radio key="c" value={3}>按开票日期</Radio>
                    <Radio key="d" value={4}>按对账日期</Radio>
                    <Radio key="e" value={5}>按开票日期</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label='滞纳金'>
                  滞纳金：超期未回收的运费，每超一个自然日，收取欠款部分的 <Input className='w60' /> %，做为滞纳金，以到账日为准
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label='信用额度'>
                  该客户每月信用额度为 <Input className='w60' defaultValue="1"/> RMB
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <FormItem label='循环单'>
                  <Input addonAfter="票" defaultValue="1"/>
                </FormItem>
              </Col>
            </Row>
          </FormLayout>
        </Panel>
        <Panel title={<Checkbox className="ant-checkbox-inline">收款条款</Checkbox>} small>
          <FormLayout inputSize="small">
            <Row>
              <Col span={4}>
                <FormItem label='结算周期'>
                  <Select size="small">
                    <Option key="1">每月一结</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={20}>
                <RadioGroup >
                  <FormItem label='结算日'>
                    <Radio key="a" value={1}>每月</Radio>

                    <Select size="small" className='w60 mr16'>
                      <Option key="1">15号</Option>
                    </Select>

                    <Radio key="b" value={2}>每结算划分日+</Radio> <Input className='w60'/> 天
                  </FormItem>
                </RadioGroup>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label='结算划分日'>
                  <RadioGroup >
                    <Radio key="a" value={1}>按业务</Radio>
                    <Radio key="b" value={2}>按对账日期</Radio>
                    <Radio key="c" value={3}>按开票日期</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </FormLayout>
        </Panel>
        <Panel noHeaderBorder small fnInline title="附件信息"
               fn={<span><Button type="primary" size='small' icon="plus-circle">新增</Button><Button
                 size='small'>删除</Button></span>}>
          <Table rowSelection={{selectedRowKeys:[]}} columns={columns} dataSource={dataSource} size="small" pagination={false}/>
        </Panel>
        <Panel noHeaderBorder small fnInline title="关联费率"
               fn={<Button type="primary" size='small' icon="plus-circle">添加费率</Button>}>
          <Table rowSelection={{selectedRowKeys:[]}} columns={columns} dataSource={dataSource} size="small" pagination={false}/>
        </Panel>
      </div>
    );
  }
}

export default Form.create()(Detail);