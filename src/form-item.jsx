import React from 'react'
import {Form} from 'antd'
import {checkSecurity} from'./share'

function FormItem(props){
    const {children, security, ...otherProps} = props
    const {canAccess} = checkSecurity(props)
    return canAccess ? <Form.Item {...otherProps}>{children}</Form.Item> : <noscript/>
}

export default FormItem