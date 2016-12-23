import React, {Component} from 'react'
import classNames from 'classnames'
import {Modal, Transfer, Row, Col, Button, Form, Input, InputNumber, Select } from 'antd'

function renderItem(item) {
    return item.title
}

const titles = ['可选', '已选']

class columnKeysModal extends Component {

    handleOk = () => {
        const {selectedKey, ...rest} = this.props.form.getFieldsValue()
        rest.pageSize = rest.pageSize - 0
        this.props.onOk(rest)
        this.props.onCancel()
    }

    handleSelect = (selectedKey) => {
        const {getFieldValue, setFieldsValue} = this.props.form
        if (getFieldValue('selectedKey') !== selectedKey) {
            setFieldsValue({selectedKey})
        }
    }

    handleMoveUp = () => {
        const {getFieldsValue, setFieldsValue} = this.props.form
        const {columnKeys, selectedKey} = getFieldsValue(['columnKeys', 'selectedKey'])
        const tmp = columnKeys.concat()
        const idx = tmp.indexOf(selectedKey)
        if (idx !== 0 ) {
            const targetIdx = idx - 1
            const targetKey = tmp[targetIdx]
            tmp[targetIdx] = selectedKey
            tmp[idx] = targetKey
            setFieldsValue({columnKeys: tmp})
        }
    }

    handleMoveDown = () => {
        const {getFieldsValue, setFieldsValue} = this.props.form
        const {columnKeys, selectedKey} = getFieldsValue(['columnKeys', 'selectedKey'])
        const tmp = columnKeys.concat()
        const idx = tmp.indexOf(selectedKey)
        if (idx + 1 !== tmp.length) {
            const targetIdx = idx + 1
            const targetKey = tmp[targetIdx]
            tmp[targetIdx] = selectedKey
            tmp[idx] = targetKey
            setFieldsValue({columnKeys: tmp})
        }
    }

    renderItem = (item) => {
        const {form} = this.props
        const {columnKeys, selectedKey} = form.getFieldsValue(['columnKeys','selectedKey'])
        const cls = classNames({
            'transfer-updown-item-selected': columnKeys.indexOf(selectedKey) > -1 && (item.key === selectedKey)
        })
        const customLabel = (
            <span className={cls} onClick={() => this.handleSelect(item.key)} >
                {item.title}
            </span>
        )
        return  {
            label:customLabel, // for displayed item
            value: item.title,   // for title and filter matching
        };
    }

    handleChange = (prop, value) => {
        this.setState({[prop]: value})
    }

    render() {
        
        const {form, visible, dataSource, onCancel, columnKeys, width, height, fixCols, pageSize} = this.props

        const modalOpts = {
            maskClosable: false,
            visible,
            onCancel,
            onOk: this.handleOk
        }

        const getFieldProps = (id, initialValue, valuePropName) => {
            return form.getFieldProps(id, {
                initialValue, 
                valuePropName, 
            })
        }
        
        getFieldProps('selectedKey')

        const columnKeysFieldProps = getFieldProps('columnKeys', columnKeys , 'targetKeys')
        const widthFieldProps = getFieldProps('width', width)
        const heightFieldProps = getFieldProps('height', height)
        const fixColsFieldProps = getFieldProps('fixCols', fixCols)
        const pageSizeFieldProps = getFieldProps('pageSize', `${pageSize}`)

        const {columnKeys: targetKeys, selectedKey} = form.getFieldsValue(['columnKeys','selectedKey'])
        const canMove = selectedKey && targetKeys.indexOf(selectedKey) > -1

        return (
            <Modal {...modalOpts}>
                <Form horizontal>
                    <Form.Item label="选择列">
                    <Row>
                        <Col span={20}>
                        <Transfer 
                            {...columnKeysFieldProps}
                            showSearch
                            titles={titles}
                            dataSource={dataSource}
                            render={this.renderItem}
                            listStyle={{width: 180}}
                        />
                        </Col>
                        <Col span={2}>
                            <div className="transfer-updown ant-transfer-operation" >
                                <Button icon="up" size="small" disabled={!canMove} onClick={this.handleMoveUp}/>
                                <Button icon="down" size="small" disabled={!canMove} onClick={this.handleMoveDown} />
                            </div>
                        </Col>
                    </Row>
                    </Form.Item>
                    <Row>
                      <Col span={10}>
                        <Form.Item label="宽度" labelCol={{span: 5}} wrapperCol={{span: 13}}>
                            <InputNumber {...widthFieldProps} /><span>px</span>
                        </Form.Item>
                        <Form.Item label="高度" labelCol={{span: 5}} wrapperCol={{span: 13}} >
                            <InputNumber {...heightFieldProps} /><span>px</span>
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item label="固定前几列" labelCol={{span: 8}} wrapperCol={{span: 14}} extra="(不含序号)">
                            <InputNumber {...fixColsFieldProps} />
                        </Form.Item>
                        <Form.Item label="每页行数" labelCol={{span: 8}} wrapperCol={{span: 9}}>
                            <Select {...pageSizeFieldProps } >
                                <Select.Option value="10" >10行/页</Select.Option>
                                <Select.Option value="20" >20行/页</Select.Option>
                                <Select.Option value="30" >30行/页</Select.Option>
                                <Select.Option value="50" >50行/页</Select.Option>
                            </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                </Form>
                
            </Modal>
        )
    }
}


export default Form.create()(columnKeysModal)