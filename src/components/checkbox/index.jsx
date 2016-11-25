import React, {Component} from 'react'
import {Checkbox as AntdCheckbox} from 'antd'
import {checkSecurity} from'../share'

class Checkbox extends Component {

    render() {
        const {children, displayName, security, ...otherProps} = this.props
        const {canAccess} = checkSecurity(this.props)
        return canAccess ? <AntdCheckbox {...otherProps}>{displayName || children}</AntdCheckbox> : <noscript/>
    }
}

export default Checkbox