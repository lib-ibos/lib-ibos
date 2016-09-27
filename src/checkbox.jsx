import React from 'react'
import {Checkbox as AntdCheckbox} from 'antd'

function Checkbox({label, ...props}) {
    return <AntdCheckbox {...props}>{label}</AntdCheckbox>
} 

export default Checkbox