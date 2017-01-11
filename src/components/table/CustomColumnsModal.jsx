import React, {Component} from 'react'
import classNames from 'classnames'
import {Modal, Row, Col, Button, Form, Input, InputNumber, Select } from 'antd'
import CustomTransfer from './CustomTransfer'

const titles = ['可选', '已选']

class CustomColumnsModal extends Component {

    static defaultProps = {
        columnKeys: [],
        fixCols: 0,
        pageSize: '10'
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedKeys: [],
            targetKeys: props.columnKeys,
            fixCols: props.fixCols,
            pageSize: props.pageSize,
        }
    }

    handleOk = () => {
        const values = this.state
        this.props.onOk(values)
        this.props.onCancel()
    }

    handleSelectChange = ({key}, checked) => {
        let {selectedKeys, targetKeys} = this.state
        if (targetKeys.indexOf(key) > -1) {
            if (checked) {
                selectedKeys = selectedKeys.concat(key)
            } else {
                selectedKeys = selectedKeys.filter(item => item !== key )
            }
            this.setState({selectedKeys})
        }
    }

    handleTransferChange = (targetKeys) => {
        this.setState({targetKeys})
    }

    handleFixColsChange = (value) => {
        this.setState({fixCols: value})
    }

    handlePageSizeChange = (value) => {
        this.setState({pageSize: value})
    }

    handleMoveUp = () => {
        const {selectedKeys, targetKeys} = this.state
        const selectedKey = selectedKeys[0]
        const tmp = targetKeys.concat()
        const idx = tmp.indexOf(selectedKey)
        if (idx !== 0 ) {
            const targetIdx = idx - 1
            const targetKey = tmp[targetIdx]
            tmp[targetIdx] = selectedKey
            tmp[idx] = targetKey
            this.setState({targetKeys: tmp})
        }
    }

    handleMoveDown = () => {
        const {selectedKeys, targetKeys} = this.state
        const selectedKey = selectedKeys[0]
        const tmp = targetKeys.concat()
        const idx = tmp.indexOf(selectedKey)
        if (idx + 1 !== tmp.length) {
            const targetIdx = idx + 1
            const targetKey = tmp[targetIdx]
            tmp[targetIdx] = selectedKey
            tmp[idx] = targetKey
            this.setState({targetKeys: tmp})
        }
    }

    renderItem = (item) => {
        return  {
            label: item.title, // for displayed item
            value: item.title,   // for title and filter matching
        };
    }

    handleChange = (targetKeys, direction, moveKeys) => {
        const {selectedKey} = this.state
        if (direction === 'left' && moveKeys.indexOf(selectedKey) > -1) {
            this.setState({selectedKeys: []})
        }
    }

    render() {
        const {targetKeys, selectedKeys, pageSize, fixCols} = this.state
        const {visible, dataSource, onCancel} = this.props

        const modalOpts = {
            maskClosable: false,
            visible,
            onCancel,
            onOk: this.handleOk
        }

        const canMove = selectedKeys.length === 1 
        const btnType = canMove ? 'primary' : 'default'
        const isFirst = canMove && targetKeys[0] === selectedKeys[0]
        const isLast = canMove && targetKeys.length > 1 && targetKeys[targetKeys.length -1] === selectedKeys[0]

        const upBtnProps = {
            icon: 'up',
            size: 'small',
            type: btnType,
            disabled: isFirst || !canMove,
            onClick: this.handleMoveUp,
        }

        const downBtnProps = {
            icon: 'down',
            size: 'small',
            type: btnType,
            disabled: isLast || !canMove,
            onClick: this.handleMoveDown,
        }

        return (
            <Modal {...modalOpts}>
                <Form horizontal>
                    <Form.Item label="选择列">
                    <Row>
                        <Col span={20}>
                        <CustomTransfer 
                            titles={titles}
                            listStyle={{width: 180, height: 300}}
                            targetKeys={targetKeys}
                            dataSource={dataSource}
                            render={this.renderItem}
                            onSelectChange={this.handleSelectChange}
                            onChange={this.handleTransferChange}
                        />
                        </Col>
                        <Col span={2}>
                            <div className="ant-transfer-operation transfer-updown " >
                                <Button {...upBtnProps} />
                                <Button {...downBtnProps} />
                            </div>
                        </Col>
                    </Row>
                    </Form.Item>
                    <Row>
                      <Col span={10}>
                        <Form.Item label="固定前几列" labelCol={{span: 8}} wrapperCol={{span: 14}} >
                            <InputNumber value={fixCols} onChange={this.handleFixColsChange} />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item label="每页行数" labelCol={{span: 8}} wrapperCol={{span: 9}}>
                            <Select value={pageSize} onChange={this.handlePageSizeChange} >
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