import React, {Component} from 'react'
import classnames from 'classnames';
import {Form} from 'antd';
const AntFormItem = Form.Item;


class FormItem extends Component {
    static defaultProps={
        labelVertical:false
    }
    render() {
        const {labelVertical,labelWidth,label,...props} = this.props
        const _style = label ? {} : {paddingLeft: 0}
        const _class = classnames(
            {"o-form-label--vertical":labelVertical},
            {["o-form-label--"+labelWidth]:labelWidth},
            {"o-form-label--none":(label == " ")}
        )
        const _label = label && label

        return (
            <AntFormItem
                {...props}
                style={_style}
                label={_label}
                className={_class}
            >
                { props.children}
            </AntFormItem>
        )
    }
}

export default FormItem