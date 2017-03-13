import React, {Component} from 'react'
import {Radio, Checkbox} from 'antd'
import {noop} from '../share'

export default class ColumnDropdownList extends Component {

    static defaultProps = {
        onChange: noop
    }

    handleChange = ({target}) => {
        this.props.onChange(target.value)
    }

    render() {
        const {value, dataSource = [], multiple} = this.props
        if (multiple) {
            const options = dataSource.map(item => ({label: item.text, value: item.value}))
            return  <Checkbox.Group value={value} options={options} onChange={this.handleChange} />
        } else {
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };
            return (
                <Radio.Group value={value} onChange={this.handleChange}>
                {dataSource.map(item => (
                    <Radio style={radioStyle} key={item.value} value={item.value}>
                        {item.text}
                    </Radio> 
                ))}
                </Radio.Group>
            )
        } 
    }
}