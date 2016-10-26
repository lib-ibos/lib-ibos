import React from 'react'
import {Form} from 'antd'
import {canRender} from'./share'

function FormItem(props){
    const {children, ...otherProps} = props
    return canRender(props) ? <Form.Item {...otherProps}>{children}</Form.Item> : null
}

export default FormItem