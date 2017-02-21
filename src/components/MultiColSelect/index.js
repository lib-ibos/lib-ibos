import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';

import {Dropdown, Input} from 'antd';
// const MenuItem = Menu.Item;
import Menu, {MenuItem} from 'rc-menu';
import KeyCode from 'rc-util/lib/KeyCode';
import './styles/index'

//props selectKey 指定一个key的值填入input中
class MultiColSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            val: "",
            optionList: {},
            open: false,
            selectKeys: ['-1'],
            activeKey: '0',
            canMenuHide: true
        }
    }

    static propTypes = {
        dataBody: React.PropTypes.array,
        dataHead: React.PropTypes.object,
        dropdwonMaxRows: React.PropTypes.number

    }

    static defaultProps = {
        selectKey: "value",
        disabled: false,
        scrollHeight: 32
    }

    scrollTo = (index) => {
        const menu = ReactDOM.findDOMNode(this.refs.menu);
        let maxHeight = (this.props.dropdwonMaxRows || 8) - 1;
        let scrollHeight = index > maxHeight ? (index - maxHeight) * this.props.scrollHeight : 0

        menu.scrollTop = scrollHeight
    }

    setOpenState = (visible) => {
        this.setState({
            open: visible
        })
    }

    setActiveState = (index) => {
        this.setState({
            activeKey: String(index)
        })

        this.scrollTo(index)
    }

    onKeyDown = (event) => {
        const props = this.props;
        if (props.disabled) {
            return;
        }
        // console.log(props.type,props.type == "textarea")
        const keyCode = event.keyCode;
        if (this.state.open && !this.getInputDOMNode()) {
            this.onInputKeyDown(event);
        } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
            //如果是textarea 模式就不支持 向下键和enter键 弹出下拉框
            props.type != "textarea" && this.setOpenState(true);
        }
    }

    getInputDOMNode = () => {
        return this.inputInstance;
    }

    onInputKeyDown = (event) => {
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
            } else {
                var _length = this.props.dataBody.length - 1;
                var currentKey = +this.state.activeKey;

                if (keyCode === KeyCode.DOWN) {
                    if (currentKey == _length) {
                        currentKey = 0;
                    } else {
                        currentKey += 1;
                    }
                } else {
                    if (currentKey == 0) {
                        currentKey = _length;
                    } else {
                        currentKey -= 1
                    }
                }

                this.setActiveState(currentKey)
            }
        } else if (keyCode === KeyCode.ESC) {
            if (state.open) {
                this.setOpenState(false);
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        } else if (keyCode === KeyCode.ENTER) {
            let _key = this.props.selectKey;
            let _obj = this.props.dataBody;
            let currentKey = this.state.activeKey;
            this.setState({
                open: false,
                selectKeys: [String(currentKey)]
            },()=>this.onSearch())
            this.props.onChange && this.props.onChange(_obj[currentKey][_key])
            this.props.onSelect && this.props.onSelect(_obj[_key]);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    openIfHasChildren = () => {
        const props = this.props;
        if (React.Children.count(props.children) || isSingleMode(props)) {
            this.setOpenState(true);
        }
    }

    handleChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.value);
        this.props.dataBody && this.props.dataBody.length > 0 && this.setOpenState(true)
        this.setState({
            selectKeys: ['-1'],
        },()=>this.onSearch())

    }

    onSearch = (e)=>{
        const onSearch = this.props.onSearch;
        const _key = this.state.selectKeys[0];
        let _obj = this.props.dataBody && this.props.dataBody[_key]
        //如果没有命中选项，则返回空对象
        !_obj && (_obj={})
        onSearch && onSearch(this.refs.input.props.value,_obj)
    }


    onMenuSelect = (value) => {
        let _key = this.props.selectKey;
        let _obj = this.props.dataBody[value.key]
        let currentKey = _obj[_key]
        this.setState({
            open: false,
            selectKeys: [String(value.key)]
        },()=>this.onSearch())
        this.setActiveState(value.key)
        this.props.onChange && this.props.onChange(currentKey)
        this.props.onSelect && this.props.onSelect(_obj);


    }

    //失焦
    handleBlur = () => {
        const _value = this.refs.input.props.value;


        if(this.state.canMenuHide){
            this.setOpenState(false);

            // 失焦的时候如果input 中被back 清掉了值，则把select
            !_value && this.setState({
                selectKeys: ['-1'],
            })
        }
    }


    handleClick = (e) => {
        const isDisabled = this.props.disabled
        if(!isDisabled){
            this.props.onChange && this.props.onChange(e.target.value);
            this.setOpenState(true)
        }
    }

    handleMenuMouseEnter = () => {
        this.setState({
            canMenuHide: false
        })
    }

    handleMenuMouseLeave = () => {
        this.setState({
            canMenuHide: true
        })
        let input = ReactDOM.findDOMNode(this.refs.input).children[0]
        input.focus()
    }


    render() {
        const {dataHeader, disabled, dataBody, type, rows, autosize, ...props} = this.props;
        const hasDataBody = dataBody && dataBody.length > 0;
        const dropdownHeadData = dataHeader,
            dropdownBodyData = hasDataBody ? dataBody : "not found";

        // 拼接下拉框header部分结构
        const dropdownHeadElement = dropdownHeadData ? <MenuItem key="title" disabled>{dropdownHeadData.map(val => <p
            key={val.dataIndex}>{val.title}</p>)}</MenuItem> : '';
        const dropdownBodyElement = !hasDataBody ?
            <MenuItem className="no-data" disabled><p colSpan="2">{dropdownBodyData}</p><p></p>
            </MenuItem> : createBodyElement();
        //下拉框body部分
        function createBodyElement() {
            const isArray = dropdownBodyData instanceof Array;
            if (!isArray) {
                throw  new TypeError('MultiColSelect 组件的 dataBody 只接受 "Array" 格式的数据');
            }

            return dropdownBodyData.map(function (val, index) {
                const parentVal = val;
                const _item = dropdownHeadData.map((val, i) => <p key={i}>{parentVal[val.dataIndex]}</p>);
                return <MenuItem key={index}>{_item}</MenuItem>//这里的key可以当value使用，不用再定义value
            })
        }

        const dropdwonMaxHeight = (props.dropdwonMaxRows + 1) * this.props.scrollHeight;
        const dropdwonStyle = props.dropdwonMaxRows && {maxHeight: dropdwonMaxHeight}

        return (
            <Dropdown overlay={
                <div
                    className="o-dropdown-multi-col"
                    ref="menu"
                    style={dropdwonStyle}
                    onMouseEnter={this.handleMenuMouseEnter}
                    onMouseLeave={this.handleMenuMouseLeave}
                >
                    <Menu
                        onSelect={this.onMenuSelect}
                        activeKey={this.state.activeKey}
                        selectedKeys={this.state.selectKeys}
                    >
                        {dropdownHeadElement}
                        {dropdownBodyElement}
                    </Menu>

                </div>
            }
                      visible={this.state.open}

            >

                <Input
                    ref="input"
                    type={type}
                    value={props.value}
                    rows={rows}
                    autosize={autosize}
                    onClick={this.handleClick}
                    onChange={this.handleChange}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.handleBlur}
                    disabled ={disabled}
                />
            </Dropdown>
        );
    }
}

export default MultiColSelect;