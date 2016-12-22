import React, {Component} from 'react'

import {Table, Button} from '../components'

export default class TableDemo extends Component {

    constructor() {
        super()
        this.state = {
            customColumns: ['name', 'address']
        }
    }

    handleCustomColumnsChange = (customColumns) => {
        this.setState({customColumns})
    }

    render() {
        const dataSource = [
            { key: '1', name: '萨克', age: 22, address: '试点试点试点试点' },
            { key: '2', name: '劳里', age: 24, address: '短短的顶顶顶顶' },
            { key: '3', name: '布鲁', age: 27, address: '啊洒洒洒洒三十岁' }
        ]

        return (
            <div style={{width: 500}}>
                <Table dataSource={dataSource} size='small' 
                    customColumns={this.state.customColumns} 
                    onCustomColumnsChange={this.handleCustomColumnsChange} >
                    <Table.Col title="姓名" dataIndex="name"></Table.Col>
                    <Table.Col title="年龄" dataIndex="age"></Table.Col>
                    <Table.Col title="住址" dataIndex="address"></Table.Col>
                </Table>
            </div>
        )
    }
}
