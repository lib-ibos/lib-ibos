import React, {Component} from 'react'
import {Button} from 'antd'
import ColumnDropdownInput from './ColumnDropdownInput'
import ColumnDropdownList from './ColumnDropdownList'
import ColumnDropdownNumber from './ColumnDropdownNumber'
import ColumnDropdownDate from './ColumnDropdownDate'

export default class ColumnDropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {value: props.value}
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({value: nextProps.value})
        }
    }

    getValue = () => {
        if (this.props.type === 'number' && this.state.value) {
            const sortedValue = this.sortNumber(this.state.value)
            this.setState({value: sortedValue})
            return sortedValue
        }
        return this.state.value
    }

    sortNumber = (val) => {
        const [startValue, endValue] = val || []
        let values = []
        if (startValue && endValue) {
            if (Number(startValue) > Number(endValue)) {
                values = [Number(endValue), Number(startValue)]
            } else {
                values = [Number(startValue), Number(endValue)]
            }
        } else if (startValue) {
            values = [Number(startValue) + '', endValue]
        } else if (endValue) {
            values = [startValue, Number(endValue) + '']
        } else if (startValue !== void 0 || endValue !== void 0) {
            values = [startValue, endValue]
        }
        return values
    }

    handleChange = (value) => {
        this.setState({value})
    }

    handleOk = () => {
        this.props.onOk(this.getValue())
    }
    
    handleReset = () => {
        this.setState({value: this.props.value})
    }

    handleToggle = (open) => {
       // if (!open) {
            this.props.handleFilterDropdownVisible(true)
       // }
    }

    render() {
        const {type, handleFilterDropdownVisible, ...restProps} = this.props
        const props = {
            ...restProps,
            value: this.state.value,
            onChange: this.handleChange,
        }
        let content
        if (type === 'list') {
            content = <ColumnDropdownList {...props} />
        } else if (type === 'number') {
            content = <ColumnDropdownNumber {...props} />
        } else if (type === 'date') {
            content = <ColumnDropdownDate {...props} onToggle={this.handleToggle} />
        } else{
            content = <ColumnDropdownInput {...props} />
        }
        return (
            <div className="custom-filter-dropdown">
                {content}
                <div className="custom-filter-dropdown-btns">
                  <Button type="primary" style={{marginRight: 8}} onClick={this.handleOk}>确定</Button>
                  <Button type="ghost" onClick={this.handleReset}>重置</Button>
                </div>
            </div>
        )
    }
}