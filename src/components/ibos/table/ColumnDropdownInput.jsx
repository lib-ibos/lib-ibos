import React, {Component} from 'react'
import {Row, Col, Input, Button} from 'antd'
import {noop} from '../share'

export default class ColumnDropdownInput extends Component {

    static defaultProps = {
        onChange: noop
    }

    handleChange = ({target}) => {
        this.props.onChange(target.value)
    }

    render() {

        return (
            <Input value={this.props.value} onChange={this.handleChange} />
        )
    }
}