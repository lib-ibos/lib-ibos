import React, {Component} from 'react'
import classnames from 'classnames';
import {Form} from 'antd';
const AntFormItem = Form.Item;

import {checkSecurity} from'../share'

class FormItem extends Component {
    static defaultProps={
        labelVertical:false
    }
    render() {
        const {security, children, labelVertical,labelWidth,...props} = this.props
        const {canAccess} = checkSecurity(this.props)
        if (!canAccess) {
            return <noscript/>
        }
        const _style = props.label ? {} : {paddingLeft: 0}
        const _class = classnames(
            {"o-form-label--vertical":labelVertical},
            {["o-form-label--"+labelWidth]:labelWidth}
        )
        return (
            <AntFormItem
                {...props}
                style={_style}
                className={_class}
            >
                { children}
            </AntFormItem>
        )
    }
}

export default FormItem