import React, {Component} from 'react'

import {Card} from 'antd'

import {Table, Button} from '../components'

const mockData =  [
    { key: '1', name: '萨克', age: 22, gender: '1', address: '试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '2', name: '劳里', age: 24, gender: '0', address: '短短的顶顶顶顶试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '3', name: '布鲁', age: 27, gender: '0', address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '4', name: '布鲁', age: 27, gender: '0', 
        address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点',
        address1: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点',
        address2: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点',
        address3: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点'
    }
]

export default class TableDemo extends Component {

    constructor() {
        super()
        this.state = {
            config: {
                // columnKeys: ['name', 'age', 'gender', 'address'],
                // width: 500,
                // height: 200,
                // pageSize: 20,
                // fixCols: 1
            }
        }
    }

    handleCustomConfigChange = (config) => {
        console.log(config)
        this.setState({config})
    }

    render() {

        const {columnKeys, width, height} = this.state.config

        return (
            <div title="表格 > 自定义列" style={{width: 700}}>
                <Table dataSource={mockData} 
                    customConfig={this.state.config} 
                    onCustomChange={this.handleCustomConfigChange} 
                >
                    <Table.Col title="序号" dataIndex="seq" width={80} fixed render={() => new Date().getTime()} />
                    <Table.Col title="姓名" dataIndex="name" width={60} />
                    <Table.Col title="年龄" dataIndex="age" width={60} />
                    <Table.Col title="性别" dataIndex="gender" width={60}
                        render={(v)=> v === '1' ? '男' : '女' }
                        filters={[{text: '男', value: '1'}, {text: '女', value: '0'}]}
                        filterMultiple={false}
                    />
                    <Table.Col title="住址" dataIndex="address"  width={200} />
                    <Table.Col title="住址1" dataIndex="address1" width={200}/>
                    <Table.Col title="住址2" dataIndex="address2" width={200}/>
                    <Table.Col title="住址3" dataIndex="address3" width={200}/>
                </Table>
            </div>
        )
    }
}
