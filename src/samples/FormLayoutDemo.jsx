import React, {Component} from 'react'
import {Input, Select, Checkbox, Form, Button} from 'antd'
import FormLayout from '../components/FormLayout'
const FormItem = FormLayout.FormItem
import DatePicker from '../components/date-picker'

class FormLayoutDemo extends Component {

    handleSubmit = () => {
        console.log(this.props.form.getFieldsValue())
    }

    render() {
        return (
            <div style={{width: 300}}>
                <FormLayout>
                    <FormItem label="用户名" security="r">
                        <Input defaultValue="只读"/>
                    </FormItem>
                    <FormItem label="只读下拉" security="r">
                        <Select defaultValue="1">
                            <Select.Option value="1">只读</Select.Option>
                            <Select.Option value="2">读写</Select.Option>
                        </Select >
                    </FormItem>
                    <FormItem label="只读日期" security="r">
                        <DatePicker defaultValue="2017-01-01"/>
                    </FormItem>
                    <FormItem label="lib-ibos日期" >
                        <DatePicker defaultValue="2017-01-01" onChange={v => console.log(v)}/>
                    </FormItem>
                    <FormItem label="lib-ibos日期" >
                        <DatePicker {...this.props.form.getFieldProps('date1', {initialValue: '2017-01-11'})} />
                    </FormItem>

                    <FormItem >
                        <Button onClick={this.handleSubmit}>提交</Button>
                    </FormItem>

                </FormLayout>
            </div>
        )
    }
}

export default Form.create()(FormLayoutDemo)