import React from 'react'
import {Button as AntdButton} from 'antd'
import {checkSecurity} from'../share'

function Button(props) {
    const {children, displayName, security, ...otherProps} = props
    const {canAccess} = checkSecurity(props)
    return canAccess ? <AntdButton {...otherProps}>{displayName || children}</AntdButton> : <noscript/>
}

export default Button