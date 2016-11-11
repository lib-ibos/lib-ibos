import React from 'react'
import {Checkbox as AntdCheckbox} from 'antd'
import {checkSecurity} from'./share'

function Checkbox(props) {
    const {displayName, security, ...otherProps} = props
    const {canAccess} = checkSecurity(props)
    return canAccess ? <AntdCheckbox {...otherProps}>{displayName}</AntdCheckbox> : <noscript/>
}

export default Checkbox