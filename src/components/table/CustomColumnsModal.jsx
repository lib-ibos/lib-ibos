import React, {Component} from 'react'
import classNames from 'classnames'
import {Modal, Transfer, Row, Col, Button, Form, Input, InputNumber, Select } from 'antd'

function renderItem(item) {
    return item.title
}

const titles = ['可选', '已选']

class CustomColumnsModal extends Component {

    constructor() {
        super()
        this.state = {
            selectedKeys: [],
            targetKeys: [],
            fixCols: '',
            pageSize: 10
        }
    }

    handleOk = () => {
        const values = this.props.form.getFieldsValue()
        values.pageSize = values.pageSize - 0
        this.props.onOk(values)
        this.props.onCancel()
    }

    handleSelect = (selectedKey) => {
        const {getFieldsValue, setFieldsValue} = this.props.form
        const {columnKeys} = getFieldsValue(['columnKeys'])
        if (columnKeys.indexOf(selectedKey) > -1) {
            if (selectedKey !== this.state.selectedKey) {
                this.setState({selectedKey})
            }
        } else {
            this.setState({selectedKey: ''})
        }
    }

    handleMoveUp = () => {
        const {selectedKey} = this.state
        const {getFieldsValue, setFieldsValue} = this.props.form
        const {columnKeys} = getFieldsValue(['columnKeys'])
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
        const {selectedKey} = this.state
        const {getFieldsValue, setFieldsValue} = this.props.form
        const {columnKeys} = getFieldsValue(['columnKeys'])
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
        const {selectedKey} = this.state
        const {columnKeys} = form.getFieldsValue(['columnKeys'])
        const cls = classNames({
            'transfer-updown-item-selected': item.key === selectedKey
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

    handleChange = (targetKeys, direction, moveKeys) => {
        const {selectedKey} = this.state
        if (direction === 'left' && moveKeys.indexOf(selectedKey) > -1) {
            this.setState({selectedKey: ''})
        }
    }

    render() {
        const {selectedKey} = this.state
        const {form, visible, dataSource, onCancel, columnKeys, width, height, fixCols, pageSize} = this.props

        const modalOpts = {
            maskClosable: false,
            visible,
            onCancel,
            onOk: this.handleOk
        }

        const getFieldProps = (id, initialValue, valuePropName, onChange) => {
            return form.getFieldProps(id, {
                initialValue, 
                valuePropName, 
                onChange,
            })
        }
        
        const columnKeysFieldProps = getFieldProps('columnKeys', columnKeys||[] , 'targetKeys', this.handleChange)
        const fixColsFieldProps = getFieldProps('fixCols', fixCols)
        const pageSizeFieldProps = getFieldProps('pageSize', `${pageSize||10}`)

        const {columnKeys: targetKeys} = form.getFieldsValue(['columnKeys'])
        const canMove = targetKeys.length > 0
        const btnType = canMove ? 'primary' : 'default'

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
                            listStyle={{width: 180, height: 300}}
                        />
                        </Col>
                        <Col span={2}>
                            <div className="transfer-updown ant-transfer-operation" >
                                <Button icon="up" size="small" type={btnType} disabled={!canMove} onClick={this.handleMoveUp}/>
                                <Button icon="down" size="small" type={btnType} disabled={!canMove} onClick={this.handleMoveDown} />
                            </div>
                        </Col>
                    </Row>
                    </Form.Item>
                    <Row>
                      <Col span={10}>
                        <Form.Item label="固定前几列" labelCol={{span: 8}} wrapperCol={{span: 14}} >
                            <InputNumber {...fixColsFieldProps} />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
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


export default Form.create()(CustomColumnsModal)