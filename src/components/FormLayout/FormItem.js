import React, {Component} from 'react'
import classnames from 'classnames';
import {Form} from 'antd';
const AntFormItem = Form.Item;

import {checkSecurity, hasOwnProp} from'../share'

class FormItem extends Component {
    static defaultProps={
        labelVertical:false
    }
    render() {
        let {security, children, labelVertical,labelWidth,label,...props} = this.props
        const {canAccess, readOnly} = checkSecurity(this.props)
        // 检查是否可显示
        if (!canAccess) {
            return <noscript/>
        }
        // 检查是否只读
        if (readOnly) {
            children = React.cloneElement(children, {disabled: true})
            // children = React.Children.map(children, c => {
            //     return React.cloneElement(c, {disabled: true})
            // })
        }

        const _style = label ? {} : {paddingLeft: 0}
        const _class = classnames(
            {"o-form-label--vertical":labelVertical},
            {["o-form-label--"+labelWidth]:labelWidth}
        )
        const _label = label && label

        return (
            <AntFormItem
                {...props}
                style={_style}
                label={_label}
                className={_class}
            >
                { children}
            </AntFormItem>
        )
    }
}

export default FormItem