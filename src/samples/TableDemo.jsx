import React, {Component} from 'react'

import {Input, Button, Row, Col, DatePicker} from 'antd'

import Table from '../components/table'

import './TableDemo.css'

const mockData =  [
    { key: '1', name: '萨克', age: 22, gender: '1', birthDay: '1985-04-08', address: '试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '2', name: '劳里', age: 24, gender: '0', birthDay: '1987-02-18', address: '短短的顶顶顶顶试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '3', name: '布鲁', age: 27, gender: '0', birthDay: '1990-09-08', address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '4', name: '布鲁', age: 27, gender: '0', birthDay: '1992-06-01',
        address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点',
        address1: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点',
        address2: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点',
        address3: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点'
    },
    { key: '5', name: '萨克', age: 22, gender: '1', birthDay: '1985-04-08', address: '试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '6', name: '劳里', age: 24, gender: '0', birthDay: '1987-02-18', address: '短短的顶顶顶顶试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '7', name: '布鲁', age: 27, gender: '0', birthDay: '1990-09-08', address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '8', name: '萨克', age: 22, gender: '1', birthDay: '1985-04-08', address: '试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '9', name: '劳里', age: 24, gender: '0', birthDay: '1987-02-18', address: '短短的顶顶顶顶试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '10', name: '布鲁', age: 27, gender: '0', birthDay: '1990-09-08', address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '11', name: '劳里', age: 24, gender: '0', birthDay: '1987-02-18', address: '短短的顶顶顶顶试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    { key: '12', name: '布鲁', age: 27, gender: '0', birthDay: '1990-09-08', address: '啊洒洒洒洒三十岁试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点试点' },
    
]

export default class TableDemo extends Component {

    constructor() {
        super()
        this.state = {
            config: {
                columnKeys: [{key:'name', required: true}, {key:'age'}, {key:'gender'}, {key:'address'}],
                pageSize: 20,
                fixCols: 1
            },
            pagination: {
                pageSize: 10,
                total: 200,
            }
        }
    }

    handleCustomConfigChange = (config) => {
        console.log(config)
        this.setState({config})
    }

    handleChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter)
    }

    render() {

        return (
            <div style={{width: 800}}>
                <Table dataSource={mockData} onChange={this.handleChange}
                    customConfig={this.state.config} 
                    onCustomChange={this.handleCustomConfigChange} 
                    showSeq
                    pagination={this.state.pagination}
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

                <hr/>

                <Table 
                    dataSource={mockData} 
                    onChange={this.handleChange} 
                    size="small"
                    filters={{age:[3,5], name:"aaa", birthDay: ['2011-01-01','2011-02-01']}}
                >
                    <Table.Col title="序号" dataIndex="seq" width={80} fixed render={() => new Date().getTime()} />
                    <Table.Col title="姓名" 
                        dataIndex="name" 
                        filterDropdownType='string'
                    />
                    <Table.Col title="性别" dataIndex="gender" width={60} 
                        render={(v)=> v === '1' ? '男' : '女' }
                        filters={[{text: '男', value: '1'}, {text: '女', value: '0'}]}
                        filterMultiple={false}
                        filterDropdownType='list'
                    />
                    <Table.Col title="年龄" dataIndex="age"  
                        filterDropdownType='number'
                     />
                    <Table.Col title="生日" dataIndex="birthDay"  
                        filterDropdownType='date'
                    />
                </Table>

            </div>
        )
    }
}


