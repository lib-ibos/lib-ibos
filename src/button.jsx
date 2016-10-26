import React from 'react'
import {Button as AntdButton} from 'antd'
import {canRender} from'./share'

function Button(props) {
    const {displayName, ...otherProps} = props
    return canRender(props) ? <AntdButton {...otherProps}>{displayName}</AntdButton> : null
}

export default Button