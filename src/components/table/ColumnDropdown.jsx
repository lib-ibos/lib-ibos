
import React, {Component} from 'react'
import {Input, DatePicker, Checkbox, Menu, Radio  } from 'antd'
import RangeInputNumber from './RangeInputNumber'

export default class ColumnDropdown extends Component {

    handleSearch = (value) => {
        this.props.onChange && this.props.onChange(value)
    }

    handleInputChange = (e) => {
        this.handleSearch(e.target.value)
    }

    handleDateChange = (val) => {
        this.handleSearch(val)
    }

    renderRangeNumber = () => {
        return <RangeInputNumber onChange={this.handleSearch} />
    }

    renderRangePicker = () => {
        return <DatePicker.RangePicker onChange={this.handleDateChange} />
    }

    renderSelect = (dataSource, multiple) => {
        if (multiple) {
            const checkboxStyle = {lineHeight: '30px'}
            return dataSource.map(item => (
                    <div key={item.value} >
                        <Checkbox style={checkboxStyle} value={item.value}>{item.text}</Checkbox> 
                    </div>
                ))
        } else {
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };
            return (
                <Radio.Group>
                {dataSource.map(item => (
                    <Radio style={radioStyle} key={item.value} value={item.value}>
                        {item.text}
                    </Radio> 
                ))}
                </Radio.Group>
            )
        }         
    }

    render() {
        const {type, value, dataSource = [], multiple} = this.props
        let content = <Input onPressEnter={this.handleInputChange} />
        if (type === 'number') {
            content = this.renderRangeNumber()
        } else if (type === 'date') {
            content = this.renderRangePicker()
        } else if (type === 'select') {
            content = this.renderSelect(dataSource, multiple)
        }

        return (
            <div className="custom-filter-dropdown">
                {content}
            </div>
        )
    }
}