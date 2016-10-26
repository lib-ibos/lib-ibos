import React from 'react'
import {Checkbox as AntdCheckbox} from 'antd'
import {canRender} from'./share'

function Checkbox(props) {
    const {displayName, ...otherProps} = props
    return canRender(props) ? <AntdCheckbox {...otherProps}>{displayName}</AntdCheckbox> : null
}

export default Checkbox