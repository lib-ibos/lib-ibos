import React from 'react'
import {Checkbox as AntdCheckbox} from 'antd'
import {canRender} from'./share'

function Checkbox(props) {
    const {diaplayName, ...otherProps} = props
    return canRender(props) ? <AntdCheckbox {...otherProps}>{diaplayName}</AntdCheckbox> : null
}

export default Checkbox