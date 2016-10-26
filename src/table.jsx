import React from 'react'
import {Table as AntdTable} from 'antd'
import {noop, canRender} from './share'

function Table(props) {
    const {children, ...otherProps} = props
    const columns = React.Children.map(children, child => child.props)
        .filter(props => canRender(props))

    return <AntdTable {...otherProps} columns={columns} />
}

Table.Col = noop

export default Table