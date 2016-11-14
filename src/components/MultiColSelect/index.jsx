import React, {Component} from 'react';
import {render}  from 'react-dom';

import {Select, Button} from 'antd';
const Option = Select.Option;

import './styles/index'

//props customContainer 可以传递一个id名称给组件，用于把下拉框放到自己的容器中
class MultiColSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            optionList: {
                head: [
                    {
                        key: "code",
                        dataIndex: "code",
                        title: "五字码"
                    },
                    {
                        key: "portEn",
                        dataIndex: "protEn",
                        title: "英文港口"
                    },
                    {
                        key: "portCn",
                        dataIndex: "protCn",
                        title: "中文港口"
                    }
                ],
                body: [
                    {
                        value: "343",
                        code: "343",
                        portEn: 'NINGBO',
                        portCn: '宁撒旦'
                    },
                    {
                        value: "45986",
                        code: "45986",
                        portEn: 'skjfalkdjf',
                        portCn: '宁撒旦'
                    }
                ]
            }
        }
    }

// 创建下拉框的包裹容器
    getContainer(container) {
        const classname = 'o-dropdown-multi-col';
        const div = document.createElement("div");
        div.className = classname;

        if (arguments[0]) {
            const cnt = document.getElementById(container);
            cnt.appendChild(div);
        } else {
            document.body.appendChild(div);
        }
        return div
    }

    render() {
        const dropdownHeadData = this.state.optionList.head,
            dropdownBodyData = this.state.optionList.body;
        // 拼接下拉框header部分结构
        const dropdownHeadElement = dropdownHeadData.map(val => <p key={val.key}>{val.title}</p>);
        const dropdownBodyElement = bodyElement();
        //下拉框body部分
        function bodyElement() {
            return dropdownBodyData.map(function (val) {
                const parentVal = val;
                const  _item = dropdownHeadData.map((val,index)=> <p key={index}>{parentVal[val.key]}</p>);
                return <Option key={val.value} value={val.value}>{_item}</Option>
            })
        }

        return (
            <Select
                combobox
                allowClear={true}
                style={{width: 100}}
                getPopupContainer={()=>this.getContainer(this.props.customContainer)}
                dropdownMatchSelectWidth={false}
                showSearch = {true}
                filterOption ={false}
                {...this.props}
            >
                <Option key="head" disabled>{dropdownHeadElement}</Option>
                {dropdownBodyElement}
            </Select>
        );
    }
}

export default MultiColSelect;