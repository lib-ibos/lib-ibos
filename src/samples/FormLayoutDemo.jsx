import React, {Component} from 'react'
import {Button, Form, Input, Select, Checkbox} from 'antd'
import FormLayout from '../components/FormLayout'
const FormItem = FormLayout.FormItem
import DatePicker from '../components/date-picker'

class FormLayoutDemo extends Component {

    constructor() {
        super()
        this.state = {}
    }

    handleChange =() => {
        this.setState({ok: !this.state.ok})
    }

    handleSubmit = () => {
        console.log(this.props.form.getFieldsValue())
    }

    render() {
        const {form} = this.props
        return (
            <div style={{width: 300}}>
                <FormLayout>
                    <FormItem label="用户名" security="r">
                        <Input defaultValue="只读"/>
                    </FormItem>
                    <FormItem label="权限变更" security={this.state.ok ? 'ru' : 'r'}>
                        <Input {...form.getFieldProps('security-test', {initialValue: '权限变更'})} />
                    </FormItem>
                    <FormItem label="只读下拉" security="r">
                        <Select defaultValue="1">
                            <Select.Option value="1">只读</Select.Option>
                            <Select.Option value="2">读写</Select.Option>
                        </Select >
                    </FormItem>
                    <FormItem label="只读日期" security="r">
                        <DatePicker defaultValue="2017-01-01" />
                    </FormItem>
                    <FormItem label="日期" >
                        <DatePicker defaultValue="2017-01-01" onChange={v => console.log(v)}/>
                    </FormItem>
                    <FormItem label="日期form" >
                        <DatePicker {...form.getFieldProps('date1', {initialValue: '2017-01-11'})} />
                    </FormItem>

                    <FormItem label="日期时间form" labelWidth="6em">
                        <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...form.getFieldProps('date2', {initialValue: '2017-01-11 12:12:22'})} />
                    </FormItem>

                    <FormItem > 
                        <Button onClick={this.handleChange}>变更</Button>
                        {' '}
                        <Button onClick={this.handleSubmit}>提交</Button>
                    </FormItem>

                </FormLayout>
            </div>
        )
    }
}

export default Form.create()(FormLayoutDemo)