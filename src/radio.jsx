import React from 'react'
import {Radio as AntdRadio} from 'antd'
import {canRender} from'./share'

function Radio(props) {
    const {displayName, ...otherProps} = props
    return canRender(props) ? <AntdRadio {...otherProps}>{displayName}</AntdRadio> : null
}

export default Radio