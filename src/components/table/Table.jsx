import React, {Component} from 'react'

import {Table as AntdTable, Button, Modal, Transfer } from 'antd'
import {checkSecurity} from '../share'

import CustomColumnsModal from './CustomColumnsModal'

function checkCustomColumns(props, columnKeys ) {
    return columnKeys.indexOf(props.dataIndex) > -1
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
        const {children, security, customConfig, onCustomChange, pagination, ...otherProps} = this.props

        // 检查整个table权限
        if (!checkSecurity(this.props).canAccess) {
            return <noscript />
        }

        const columnKeys = customConfig ? customConfig.columnKeys : void 0

        const isValidCustomKeys = columnKeys && Array.isArray(columnKeys) && columnKeys.length > 0

        const columnConfigs =  React.Children.map(children, child => child.props)
        
        // 缓存下，便于自定义列时快速查找
        let memo = {}

        let columns = columnConfigs
            .filter(childProps => isValidCustomKeys ? checkCustomColumns(childProps, columnKeys) : true)
            .filter(childProps => {
                const canAccess = checkSecurity(childProps).canAccess
                canAccess && (memo[childProps.dataIndex] = childProps)
                return canAccess
            })

        if (isValidCustomKeys) {
            columns = columnKeys.map(col => memo[col])
        }
        
        let title

        if (customConfig) {
            title = (data) => <Button onClick={this.handleShow}>自定义列</Button>
            if (customConfig.fixCols) {
                columns = columns.map((c,i) => {
                   const fixed = i < customConfig.fixCols 
                   return {...c, fixed}
                } )
            }

            if (customConfig.pageSize) {
                otherProps.pagination = otherProps.pagination || {}
                otherProps.pagination.pageSize = customConfig.pageSize
            }

            if (customConfig.width) {
                otherProps.scroll = otherProps.scroll || {}
                otherProps.scroll.x = customConfig.width
            }

            if (customConfig.height) {
                otherProps.scroll = otherProps.scroll || {}
                otherProps.scroll.y = customConfig.height
            }
        }
        
        const tableOpts = {
            title,
            ...otherProps,
            columns,
        }
        const modalOpts = {
            ...customConfig,
            visible: this.state.visible,
            onCancel: this.handleClose,
            onOk: onCustomChange,
            dataSource: columnConfigs.map( ({title, dataIndex}) => ({key: dataIndex, title})),
        }
        // 每次弹框都重新渲染
        const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

        return (
            <div>
                <AntdTable {...tableOpts}  />
                <CustomColumnsModalGen />
            </div>
        )
       
    }
}

export default Table