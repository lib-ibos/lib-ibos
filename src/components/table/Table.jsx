import React, {Component} from 'react'
import {Table as AntdTable, Button, Modal, Transfer } from 'antd'
import {checkSecurity} from '../share'

import CustomColumnsModal from './CustomColumnsModal'

function checkCustomColumns(props, customColumns ) {
    return customColumns.indexOf(props.dataIndex) > -1
}

class Table extends Component {

    constructor() {
        super()
        this.state = {
            visible: false
        }
    }

    handleShow = () => {
        this.setState({visible: true})
    }

    handleClose = () => {
        this.setState({visible: false})
    }

    render() {
        const {children, security, customColumns, onCustomColumnsChange, ...otherProps} = this.props
        const {canAccess} = checkSecurity(this.props)

        const isValidCustomColumns = customColumns && Array.isArray(customColumns) && customColumns.length > 0
        const columnConfigs =  React.Children.map(children, child => child.props)
        const columns = columnConfigs
            .filter(childProps => isValidCustomColumns ? checkCustomColumns(childProps, customColumns) : true)
            .filter(childProps => checkSecurity(childProps).canAccess)
        
        let title
        if (customColumns) {
            title = (data) => <Button onClick={this.handleShow}>自定义列</Button>
        }
        
        if (canAccess) {
            const tableOpts = {
                title,
                ...otherProps
            }
            const modalOpts = {
                visible: this.state.visible,
                onCancel: this.handleClose,
                onOk: onCustomColumnsChange,
                dataSource: columnConfigs.map( ({title, dataIndex}) => ({key: dataIndex, title})),
                targetKeys: customColumns,
            }
            // 每次弹框都重新渲染
            const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

            return (
                <div>
                    <AntdTable {...tableOpts} columns={columns} />
                    <CustomColumnsModalGen />
                </div>
            )
        }
        return <noscript/>
    }
}

export default Table