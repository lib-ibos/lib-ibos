import React, {Component} from 'react';
import {render}  from 'react-dom';

import { Dropdown,Input} from 'antd';
import Menu ,{MenuItem} from 'rc-menu';
import KeyCode from 'rc-util/lib/KeyCode';
import './styles/index'

//props selectKey 指定一个key的值填入input中
class RichSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            val:"",
            optionList: {},
            selectedKeys:['0'],
            open:false
        }
    }

    static defaultProps ={
        selectKey:"value",
        disabled:false
    }

    handleFocus = (e) =>{
        e.target.select();

        // 为了首次触发去请求数据
        this.handleChange(e)
    }

    handleChange =(e)=>{
        this.setState({
            val:e.target.value,
            selectedKeys:['0']
        })
       if(this.props.onChange ) {
           let data = this.props.onChange();
           this.setState({
               optionList:data
           })
       }
    }

    setOpenState=(visible)=>{
        this.setState({
            open:visible
        })
    }

    onKeyDown=(event) =>{
        const props = this.props;
        if (props.disabled) {
            return;
        }
        const keyCode = event.keyCode;
        if (this.state.open && !this.getInputDOMNode()) {
            this.onInputKeyDown(event);
        } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
            this.setOpenState(true);
            event.preventDefault();
        }
    }

    getInputDOMNode=()=> {
        return this.inputInstance;
    }

    onInputKeyDown=(event)=> {
        const props = this.props;
        if (props.disabled) {
            return;
        }
        const state = this.state;
        const keyCode = event.keyCode;


        if (keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
            if (!state.open && keyCode === KeyCode.DOWN) {
                this.openIfHasChildren();
                event.preventDefault();
                event.stopPropagation();
                return;
            }else{
                var currentKey = +this.state.selectedKeys[0];
                var _length = this.state.optionList.body.length - 1;

                // console.log(currentKey ,_length,currentKey == _length)
                if(keyCode === KeyCode.DOWN){
                    if(currentKey == _length ){
                        currentKey = 0;
                    }else {
                        currentKey = +this.state.selectedKeys[0] +1
                    }
                }else{
                    if(currentKey == 0){
                        currentKey = _length ;
                    }else {
                        currentKey = +this.state.selectedKeys[0] -1
                    }
                }

                this.setState({
                    selectedKeys:[String(currentKey)]
                })
            }
        } else if (keyCode === KeyCode.ESC) {
            if (state.open) {
                this.setOpenState(false);
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        }else if (keyCode === KeyCode.ENTER){
            let _obj = this.state.optionList.body;
            let currentKey = this.state.selectedKeys;
            this.setOpenState(false);
            console.log(_obj[currentKey][this.props.selectKey])
            this.setState({
                val:_obj[currentKey][this.props.selectKey]
            })
            this.props.onCustomSelect && this.props.onCustomSelect(_obj[currentKey]);
        }

    }

    openIfHasChildren =()=> {
        const props = this.props;
        if (React.Children.count(props.children) || isSingleMode(props)) {
            this.setOpenState(true);
        }
    }

    render() {
        const that = this;
        const dropdownHeadData = this.state.optionList.head,
            dropdownBodyData = this.state.optionList.body;
        // 拼接下拉框header部分结构
        const dropdownHeadElement = dropdownHeadData && dropdownHeadData.map(val => <p key={val.dataIndex}>{val.title}</p>);
        const dropdownBodyElement = dropdownBodyData && bodyElement();
        //下拉框body部分
        function bodyElement() {
            return dropdownBodyData.map(function (val,index) {
                const parentVal = val;
                const  _item = dropdownHeadData.map((val,i)=> <p key={i}>{parentVal[val.dataIndex]}</p>);
                return <MenuItem key={index}>{_item}</MenuItem>//这里的key可以当value使用，不用再定义value
            })
        }

        function handleSelect(value){
            let _key = that.props.selectKey;
            let _obj = dropdownBodyData[value.key]
            let currentKey = dropdownBodyData[value.key][_key]
            that.setState({
                val:currentKey,
                open:false,
                selectedKeys:[String(value.key)]
            })
            that.props.onCustomSelect && that.props.onCustomSelect(_obj);
        }

        return (
            <Dropdown overlay={
                <Menu
                    multiple
                    onSelect={handleSelect}
                    className="o-dropdown-multi-col"
                    selectedKeys={this.state.selectedKeys}
                >
                    <MenuItem key="title" disabled>{dropdownHeadElement}</MenuItem>
                    {dropdownBodyElement}
                </Menu>
            }
                      onClick ={()=>this.setOpenState(true)}
                      onBlur ={()=>this.setOpenState(false)}
                      visible={this.state.open}
            >

                <Input
                       {...this.props}
                       onChange = {this.handleChange}
                       value = {this.state.val}
                       onFocus = {this.handleFocus}
                       onKeyDown={this.onKeyDown}
                />
            </Dropdown>
        );
    }
}

export default RichSelect;