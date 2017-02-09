import React, {Component} from 'react'
import {Input} from 'antd'
import {filterNum, noop} from '../share'

export default class ColumnDropdownNumber extends Component {

    static defaultProps = {
        onChange: noop
    }

    handleChange = (value) => {
        this.props.onChange(value)
    }

    handleStartChange = ({target}) => {
        const value = this.getValue()
        this.handleChange([filterNum(target.value),value[1]])
    }

    handleEndChange = ({target}) => {
        const value = this.getValue()
        this.handleChange([value[0],filterNum(target.value)])
    }

    getValue = () => {
        return this.props.value || []
    }

    render() {
        const value = this.getValue()
        return (
            <div className="table-range-input-number">
                <Input value={value[0]} onChange={this.handleStartChange}  />
                <span className="table-range-split-tilde">~</span>
                <Input  value={value[1]} onChange={this.handleEndChange}  />
            </div>
        )
    }
}