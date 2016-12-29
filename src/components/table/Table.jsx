import React, {Component} from 'react'

import {Table as AntdTable, Button, Modal, Transfer } from 'antd'

import {checkSecurity} from '../share'

import CustomColumnsModal from './CustomColumnsModal'
import ColumnDropdown from './ColumnDropdown'
import FilterBar from './FilterBar'

function checkCustomColumns(props, columnKeys ) {
    return columnKeys.indexOf(props.dataIndex) > -1
}

class Table extends Component {

    constructor() {
        super()
        this.state = {
            visible: false,
        }
    }

    handleShow = () => {
        this.setState({visible: true})
    }

    handleClose = () => {
        this.setState({visible: false})
    }

    handleChange = (pagination, filters, sorter) => {
        const mergedFilters = {...this.state.filters, ...filters}
        this.setState({pagination, sorter, filters: mergedFilters}, () => {
            this.props.onChange && this.props.onChange(
                this.state.pagination, 
                this.state.filters, 
                this.state.sorter
            )
        })
    }

    handleCustomFiltersChange = (cutomFilters) => {
        const mergedFilters = {...this.state.filters, ...cutomFilters}
        this.setState({filters: mergedFilters}, () => {
            this.props.onChange && this.props.onChange(
                this.state.pagination, 
                this.state.filters, 
                this.state.sorter
            )
        })
    }

    handleTagRemove = (key) => {
        const filters = {...this.state.filters}
        delete filters[key]
        this.setState({filters})
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

        const colTitles = columnConfigs.reduce((memo, {dataIndex, title}) => {
            memo[dataIndex] = title
            return memo
        }, {})

        const seqColConfig = columnConfigs.splice(0,1)[0]
        
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

        const allColConfig = columnConfigs.map( ({title, dataIndex}) => ({key: dataIndex, title}))

        columns.unshift(seqColConfig)

        columns = columns.map(colProps => {
            const props =  {...colProps}
            if (props.filterDropdownType) {
                props.filterDropdown = (
                    <ColumnDropdown 
                        type={props.filterDropdownType}
                        dataSource={props.filters}
                        multiple={props.filterMultiple}
                        onChange={v => this.handleCustomFiltersChange({[props.dataIndex]: v})}
                    />
                )
                delete props.filterDropdownType
            }
            return props
        })
        
        // 表格参数
        const tableOpts = {
            title,
            ...otherProps,
            columns,
            onChange: this.handleChange,
        }
        // 弹出框参数
        const modalOpts = {
            ...customConfig,
            visible: this.state.visible,
            onCancel: this.handleClose,
            onOk: onCustomChange,
            dataSource: allColConfig
        }
        // 每次弹框都重新渲染
        const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

        return (
            <div>
                <FilterBar colTitles={colTitles} filters={this.state.filters} onClose={this.handleTagRemove} />
                <AntdTable {...tableOpts}  />
                <CustomColumnsModalGen />
            </div>
        )
       
    }
}

export default Table




