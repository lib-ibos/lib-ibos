import React, {Component} from 'react';
import ReactDOM,{render}  from 'react-dom';

import { Dropdown as AntDropdown,Button,Tooltip } from 'antd';
// const MenuItem = Menu.Item;
import Menu ,{MenuItem,Divider} from 'rc-menu';
import KeyCode from 'rc-util/lib/KeyCode';
import './styles/index'



function sortACS(data) {
    return data.sort(function (a, b) {
        return a > b ? 1 : -1
    })
}
//props selectKey 指定一个key的值填入input中
class Dropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            multiMenu:null,
            visible:this.props.visible,
            selectedKeys:this.props.selectedKeys || [],
            prevSelectKeys:this.props.selectedKeys || []
        }
    }

    static propTypes = {
        onConfirm: React.PropTypes.func,

    }

    static defaultProps ={
        selectKey:"value",
        disabled:false,
    }

    handlerClick=()=>{
        this.setState({
            visible:true
        });
    }

    handlerSelect=({ selectedKeys }) =>{
        this.setState({
            selectedKeys:selectedKeys
        })
    }

    handlerConfirm=()=>{

            this.props.onConfirm && this.props.onConfirm(sortACS(this.state.selectedKeys))

            this.setState({
                visible: false,
                prevSelectKeys:this.state.selectedKeys
            });

    }

    handlerCancel = ()=>{
        this.setState({
            visible: false,
        });
    }

    visibleChange =(visible)=>{
        this.setState({
            visible,
            selectedKeys:this.state.prevSelectKeys
        });
    }

    getMultiMenu=()=>{
        let {overlay,dropdownStyle} = this.props
        const children = overlay.props.children
        let confirmBtn = <Button
            className="reset-ant-disable-pointer"
            size="small"
            type="primary"
            onClick={this.handlerConfirm}
        > 确定 </Button>

        confirmBtn = this.props.uniqueSelect && !!!this.state.selectedKeys.length ? <Tooltip  title="必须选择一项！" overlayClassName="reset-ant-disable-pointer"><Button className="reset-ant-disable-pointer" size="small" disabled> 确定 </Button></Tooltip> : confirmBtn

        const menu = (
            <Menu
                multiple
                onSelect={this.handlerSelect}
                onDeselect={this.handlerSelect}
                selectedKeys={this.state.selectedKeys}
                style={dropdownStyle}
            >
                {children.map(item=>item)}
                <Divider/>
                <MenuItem  disabled>
                    {confirmBtn} <Button
                        size="small"
                        className="reset-ant-disable-pointer"
                        onClick={this.handlerCancel}
                    > 取消 </Button>
                </MenuItem>
            </Menu>
        );
        return menu
    }

    componentWillMount() {


    }


    render() {
        const that = this;
        const {children,multiple,dropdownStyle,overlay,...props} = this.props;
        let _props;
        if(!!multiple){
            const multipleProps ={
                overlayClassName:'o-multi-dropdown',
                visible:that.state.visible,
                onClick:this.handlerClick,
                onVisibleChange:this.visibleChange
        }
            _props  = Object.assign({...props},multipleProps,{overlay:this.getMultiMenu()})

        }else {
            _props  = Object.assign({...props},{overlay:overlay})
        }


        return (
            <AntDropdown
                {..._props}
            >
                {children}
            </AntDropdown>
        );
    }
}

export default Dropdown;