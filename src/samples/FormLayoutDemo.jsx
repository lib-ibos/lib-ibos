import React, {Component} from 'react'
import {Form, Input, Select, DatePicker, Checkbox} from 'antd'
import FormLayout from '../components/FormLayout'
const FormItem = FormLayout.FormItem

class FormLayoutDemo extends Component {

    constructor() {
        super()
        this.state = {}
    }

    handleChange =() => {
        this.setState({ok: !this.state.ok})
    }

    render() {
        const {form} = this.props
        return (
            <div style={{width: 300}}>
                <button onClick={this.handleChange}>change</button>
                <FormLayout>
                    <FormItem label="用户名" security="r">
                        <Input defaultValue="只读"/>
                    </FormItem>
                    <FormItem label="用户名" security={this.state.ok ? 'ru' : 'r'}>
                        <Input {...form.getFieldProps('test',{initialValue: 'aaa' + this.state.ok})}/>
                    </FormItem>
                    <FormItem label="类型" security="r">
                        <Select defaultValue="1">
                            <Select.Option value="1">只读</Select.Option>
                            <Select.Option value="2">读写</Select.Option>
                        </Select >
                    </FormItem>
                    <FormItem label="只读日期" security="r">
                        <DatePicker defaultValue="2017-01-01" />
                    </FormItem>
                    <FormItem label="日期值" >
                        <DatePicker defaultValue="2017-01-01" onChange={(v,a) => console.log(v,a)}/>
                    </FormItem>
                </FormLayout>
            </div>
        )
    }
}

export default Form.create()(FormLayoutDemo)