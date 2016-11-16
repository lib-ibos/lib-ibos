import React from 'react'
import {Radio as AntdRadio} from 'antd'
import {checkSecurity} from'../share'

function Radio(props) {
    const {children, displayName, security, ...otherProps} = props
    const {canAccess} = checkSecurity(props)
    return canAccess ? <AntdRadio {...otherProps}>{displayName || children}</AntdRadio> : <noscript/>
}

export default Radio