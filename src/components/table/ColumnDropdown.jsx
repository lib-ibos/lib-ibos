
import React, {Component} from 'react'
import {Input, DatePicker, Checkbox, Menu, Radio  } from 'antd'
import RangeInputNumber from './RangeInputNumber'
import RangeDatePicker from './RangeDatePicker'
import DateTimeFormat from 'gregorian-calendar-format';
import locale from 'antd/lib/date-picker/locale/zh_CN'
import GregorianCalendar from 'gregorian-calendar';

import RangeCalendar from 'rc-calendar/lib/RangeCalendar'

function getFormatter() {
    const formatter = new DateTimeFormat('yyyy-MM-dd', locale.lang.format);;
    return formatter;
}

function parseDateFromValue(value) {
    if (value) {
        if (typeof value === 'string') {
            return getFormatter().parse(value, { locale});
        } else if (value instanceof Date) {
            let date = new GregorianCalendar(locale);
            date.setTime(+value);
            return date;
        }
    }
    return value;
}

function formatDate(date) {
    if (!date) {
      return date
    }
    return getFormatter().format(date)
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

    handleInputChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleSearch = (value) => {
        this.props.onChange && this.props.onChange(value)
    }

    handleChange = (e) => {
        const value = e.target.value
        if (value !== this.props.value) {
            this.handleSearch(value)
        }
    }

    handleDateChange = (value) => {
        const val = [formatDate(value[0]), formatDate(value[1])]
        this.setState({value})
        this.handleSearch(val)
    }

    renderRangeNumber = () => {
        return <RangeInputNumber value={this.state.value} onChange={this.handleSearch} />
    }

    renderRangePicker = () => {
        let value = this.state.value || []
        if (value && typeof value[0] === 'string') {
           value = value.map(v => parseDateFromValue(v))
        }
        return (
            <RangeCalendar 
                prefixCls="ant-calendar" 
                locale={locale.lang} 
                showClear
                showOk
                selectedValue={value}
                dateInputPlaceholder={locale.lang.rangePlaceholder}
                onChange={v => this.setState({value: v})}
                onOk={this.handleDateChange} 
            />
        )
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
                <Radio.Group value={this.state.value} onChange={this.handleChange}>
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
        let content = (
            <Input
                value={this.state.value}
                onChange={this.handleInputChange}
                onPressEnter={this.handleChange}
            />
        )
        if (type === 'number') {
            content = this.renderRangeNumber()
        } else if (type === 'date') {
            content = this.renderRangePicker()
        } else if (type === 'list') {
            content = this.renderSelect(dataSource, multiple)
        }

        return (
            <div className="custom-filter-dropdown">
                {content}
            </div>
        )
    }
}


