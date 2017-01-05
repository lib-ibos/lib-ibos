import React, {Component} from 'react'
import {Tag,Alert} from 'antd'

export default class FilterBar extends Component {

    handleClose = (key) => {
        this.props.onClose(key)
    }

    render() {
        const {filters = {}, dataSource = []} = this.props

        const columnInfo = dataSource.reduce((memo, info) => {
            memo[info.dataIndex] = info
            return memo
        }, {})

        const keys = Object.keys(filters)
        if (keys.length) {
            const message = keys.map(key => {
                const {title, filters: filterOptions, filterDropdownType } = columnInfo[key]
                const name = title
                let value = filters[key]
                if (filterOptions) {
                    value = filterOptions.filter(c => value.indexOf(c.value) > -1).map(c => c.text)
                }
                if (filterDropdownType === 'number' || filterDropdownType === 'date') {
                    value = value.join(' ~ ')
                }
                return (
                    <Tag key={key} closable color="blue" onClose={_ => this.handleClose(key)}>
                        {name}: {`${value}`}
                    </Tag>
                )
            })
            return <Alert message={message} type="info" showIcon />
        } 
        return null
    }

}