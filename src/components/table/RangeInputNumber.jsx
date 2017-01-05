import React, {Component} from 'react'
import {Input,Col} from 'antd'
import {filterNum, noop} from '../share'

export default class RangeInputNumber extends Component {

    constructor(props) {
        super(props)
        const value = props.value || []
        this.state = {
            startValue: value[0],
            endValue: value[0],
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value || []
            this.setState({
                startValue: value[0],
                endValue: value[1]
            })
        }
    }

    handleChange = () => {
        const callback = this.props.onChange || noop
        const {startValue, endValue} = this.state
        let values = []
        if (startValue && endValue) {
            if (Number(startValue) > Number(endValue)) {
                values = [Number(endValue), Number(startValue)]
            } else {
                values = [Number(startValue), Number(endValue)]
            }
        } else if (startValue) {
            values = [Number(startValue), endValue]
        } else if (endValue) {
            values = [startValue, Number(endValue)]
        } else {
            values = [startValue, endValue]
            callback(startValue, endValue)
        }
        callback(values)
    }

    handleStartChange = (e) => {
        this.setState({startValue: filterNum(e.target.value)})
    }

    handleEndChange = (e) => {
        this.setState({endValue: filterNum(e.target.value)})
    }

    render() {
        const {startValue, endValue} = this.state
        return (
            <div className="table-range-input-number">
                <Input value={startValue} onChange={this.handleStartChange} onPressEnter={this.handleChange} />
                <span className="table-range-split-tilde">~</span>
                <Input  value={endValue} onChange={this.handleEndChange} onPressEnter={this.handleChange} />
            </div>
        )
    }

}