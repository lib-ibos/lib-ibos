import React from 'react'
import {Table as AntdTable} from 'antd'
import {noop, checkSecurity} from './share'

function Table(props) {
    const {children, security, ...otherProps} = props
    const {canAccess} = checkSecurity(props)
    if (canAccess) {
        const columns = React.Children.map(children, child => child.props)
            .filter(childProps => checkSecurity(childProps).canAccess)
        return <AntdTable {...otherProps} columns={columns} />
    }
    return <noscript/>
}

Table.Col = noop

export default Table