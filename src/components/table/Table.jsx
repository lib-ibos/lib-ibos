import React, {Component} from 'react'

import {Table as AntdTable, Button, Modal, Transfer } from 'antd'

import {checkSecurity, noop} from '../share'

import CustomColumnsModal from './CustomColumnsModal'
import ColumnDropdown from './ColumnDropdown'
import FilterBar from './FilterBar'

function checkCustomColumns(props, columnKeys ) {
    return columnKeys.some(info => info.key === props.dataIndex)
}

const defaultPagination = {
  onChange: noop,
  onShowSizeChange: noop,
};

class Table extends Component {

    constructor(props) {
        super(props)
        const pagination = props.pagination || {};
        this.state = {
            visible: false,
            sorter: {},
            filters: props.filters || {},
            pagination: this.props.pagination !== false ?
                {
                    ...defaultPagination,
                    ...pagination,
                    current: pagination.defaultCurrent || pagination.current || 1,
                    pageSize: pagination.defaultPageSize || pagination.pageSize || 10,
                } : {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('filters' in nextProps) {
            this.setState({filters: nextProps.filters || {}})
        }
        if ('sorter' in nextProps) {
            this.setState({sorter: nextProps.sorter || {}})
        }
    }
    

    handleShow = () => {
        this.setState({visible: true})
    }

    handleClose = () => {
        this.setState({visible: false})
    }

    callback = () => {
        const {pagination, filters, sorter} = this.state
        this.props.onChange(pagination, filters, sorter)
    }

    handleChange = (pagination, filters, sorter) => {
        const mergedFilters = {...this.state.filters, ...filters}
        this.setState({pagination, sorter, filters: mergedFilters}, this.callback)
    }

    handleCustomFiltersChange = (key, value) => {
        const filterValues = {...this.state.filters, [key]: value}
        this.setState({
            [`filterDropdown-${key}Visible`]: false,
            filters: filterValues
        }, this.callback)
    }

    handleTagRemove = (key) => {
        const filters = {...this.state.filters}
        delete filters[key]
        this.setState({filters}, this.callback)
    }

    hanldeTagAllRemove = () => {
        this.setState({filters: {}}, this.callback)
    }

    handleFilterDropdownVisibleChange = (visible, {dataIndex}) => {
        this.setState({[`filterDropdown-${dataIndex}Visible`]: visible})
    }

    render() {
        const {children, security, customConfig, onCustomChange, showSeq, ...otherProps} = this.props

        // 检查整个table权限
        if (!checkSecurity(this.props).canAccess) {
            return <noscript />
        }

        let columnKeys = customConfig ? customConfig.columnKeys : void 0

        const isValidCustomKeys = columnKeys && Array.isArray(columnKeys) && columnKeys.length > 0

        const columnConfigs =  React.Children.map(children, child => child.props)

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
            // 持久化的自定义列可能在前端不存在了
            columnKeys = columnKeys.filter(col => !!memo[col.key])
            columns = columnKeys.map(col => memo[col.key])
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

            if (otherProps.pagination && customConfig.pageSize) {
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

        showSeq && columns.unshift(seqColConfig)

        columns = columns.map(colProps => {
            const props =  {...colProps}
            if (props.filterDropdownType) {
                props.filterDropdown = (
                    <ColumnDropdown 
                        value={this.state.filters[props.dataIndex]}
                        type={props.filterDropdownType}
                        dataSource={props.filters}
                        multiple={props.filterMultiple}
                        onOk={v => this.handleCustomFiltersChange(props.dataIndex, v)}
                    />
                )
                props.filterDropdownVisible = this.state[`filterDropdown-${colProps.dataIndex}Visible`]
                props.onFilterDropdownVisibleChange = (visible) => this.handleFilterDropdownVisibleChange(visible, colProps)
                //delete props.filterDropdownType
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
            columnKeys,
            visible: this.state.visible,
            onCancel: this.handleClose,
            onOk: onCustomChange,
            dataSource: allColConfig
        }
        // 每次弹框都重新渲染
        const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

        return (
            <div>
                <FilterBar 
                    dataSource={columns} 
                    filters={this.state.filters} 
                    onRemove={this.handleTagRemove} 
                    onReset={this.hanldeTagAllRemove}
                />
                <AntdTable {...tableOpts}  />
                <CustomColumnsModalGen />
            </div>
        )
       
    }
}

export default Table




