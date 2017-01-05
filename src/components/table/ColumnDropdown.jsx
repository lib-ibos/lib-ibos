
import React, {Component} from 'react'
import {Input, DatePicker, Checkbox, Menu, Radio  } from 'antd'
import RangeInputNumber from './RangeInputNumber'
import RangeDatePicker from './RangeDatePicker'
import DateTimeFormat from 'gregorian-calendar-format';
import locale from 'antd/lib/date-picker/locale/zh_CN'
import GregorianCalendar from 'gregorian-calendar';

import RangeCalendar from 'rc-calendar/lib/RangeCalendar'

function formatDate(date) {
    if (!date) {
      return date
    }
    const formatter = new DateTimeFormat('yyyy-MM-dd', locale.lang.format);
    // const calendar = new GregorianCalendar(locale)
    // calendar.setTime(date)
    return formatter.format(date)
}

export default class ColumnDropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({value: nextProps.value})
        }
    }

    handleC = (e) => {
        this.setState({value: e.target.value})
    }

    handleSearch = (value) => {
        this.props.onChange && this.props.onChange(value)
    }

    handleInputChange = (e) => {
        const value = e.target.value
        if (value !== this.props.value) {
            this.handleSearch(value)
        }
    }

    handleDateChange = (val) => {
        val = [formatDate(val[0]), formatDate(val[1])]
        this.handleSearch(val)
    }

    renderRangeNumber = () => {
        return <RangeInputNumber value={this.state.value} onChange={this.handleSearch} />
    }

    renderRangePicker = () => {
        //return <DatePicker.RangePicker onChange={this.handleDateChange} />
        //return <RangeDatePicker onChange={this.handleDateChange} />
        return <RangeCalendar 
        prefixCls="ant-calendar" 
        locale={locale.lang} 
        showClear
        showOk
        dateInputPlaceholder={locale.lang.rangePlaceholder}
        onOk={this.handleDateChange} />
    }

    renderSelect = (dataSource, multiple) => {
        if (multiple) {
            const options = dataSource.map(item => ({label: item.text, value: item.value}))
            return  <Checkbox.Group value={this.state.value} options={options} onChange={this.handleSearch} />
        } else {
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };
            return (
                <Radio.Group value={this.state.value} onChange={this.handleInputChange}>
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
        let content = <Input value={this.state.value} onChange={this.handleC} onPressEnter={this.handleInputChange} />
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


