import React, {Component} from 'react'
import classnames from 'classnames';
import {Form} from 'antd';
const AntFormItem = Form.Item;


class FormItem extends Component {
    static defaultProps={
        labelVertical:false
    }
    render() {
        const {labelVertical,labelWidth,...props} = this.props
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
                { props.children}
            </AntFormItem>
        )
    }
}

export default FormItem