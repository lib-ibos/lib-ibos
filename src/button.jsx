import React from 'react'
import {Button as AntdButton} from 'antd'
import {canRender} from'./share'

function Button(props) {
    const {diaplayName, ...otherProps} = props
    return canRender(props) ? <AntdButton {...otherProps}>{diaplayName}</AntdButton> : null
}

export default Button