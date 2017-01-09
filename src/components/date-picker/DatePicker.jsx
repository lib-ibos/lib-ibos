import React, {Component} from 'react'
import {DatePicker as AntdDatePicker} from 'antd'

export default class DatePicker extends Component {
    
    handleChange = (date, str) => {
        this.props.onChange(str)
    }

    render() {
        const newProps = {...this.props, onChange: this.handleChange}
        return (
            <AntdDatePicker {...newProps} />
        )
    }
}