import React, { Component } from 'react'
import '../../antd/date-picker/style'
import {noop} from '../share'
import DateTimeFormat from 'gregorian-calendar-format';
import locale from '../../antd/date-picker/locale/zh_CN'
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

export default class ColumnDropdownDate extends Component {

    static defaultProps = {
        onChange: noop
    }

    getValue = () => {
        return this.props.value || []
    }

    handleChange = (value) => {
        if (value && value.length === 2 && !value.hovering) {
            value = [formatDate(value[0]), formatDate(value[1])]
        }
        this.props.onChange(value);
    }

    render() {
        let value = this.getValue()
        if (value && typeof value[0] === 'string') {
           value = value.map(v => parseDateFromValue(v))
        }
        return (
            <RangeCalendar 
                prefixCls="ant-calendar" 
                locale={locale.lang} 
                selectedValue={value}
                dateInputPlaceholder={locale.lang.rangePlaceholder}
                onChange={this.handleChange}
                onOk={this.handleDateChange} 
            />
        )
    }
}