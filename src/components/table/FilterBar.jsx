import React, {Component} from 'react'
import {Tag,Alert} from 'antd'

export default class FilterBar extends Component {

    handleClose = (key) => {
        this.props.onClose(key)
    }

    render() {
        const {filters = {}, colTitles = {}} = this.props
        const keys = Object.keys(filters)
        if (keys.length) {
            const message = keys.map(key => {
                const name = colTitles[key]
                let value = filters[key]
                return (
                    <Tag key={key} closable color="blue" onClose={_ => this.handleClose(key)}>
                        {`${name}:${value}`}
                    </Tag>
                )
            })
            return <Alert message={message} type="info" showIcon />
        } 
        return null
    }

}