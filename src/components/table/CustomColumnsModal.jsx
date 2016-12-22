import React, {Component} from 'react'
import {Modal, Transfer } from 'antd'

function renderItem(item) {
    return item.title
}

const titles = ['可选', '已选']

export default class CustomColumnsModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            targetKeys: props.targetKeys
        }
    }

    handleChange = (targetKeys) => {
        this.setState({targetKeys})
    }

    handleOk = () => {
        this.props.onOk(this.state.targetKeys.concat())
        this.props.onCancel()
    }

    render() {
        const {visible, onCancel, dataSource} = this.props
        const {targetKeys} = this.state

        const modalOpts = {
            maskClosable: false,
            visible,
            onCancel,
            onOk: this.handleOk
        }

        return (
            <Modal {...modalOpts}>
                <Transfer 
                    showSearch
                    titles={titles}
                    dataSource={dataSource}
                    targetKeys={targetKeys}
                    onChange={this.handleChange}
                    render={renderItem}
                />
            </Modal>
        )
    }
}
