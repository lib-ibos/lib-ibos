import React, {Component} from 'react'
import classnames from 'classnames';
import {Form,Tag,Checkbox,Radio} from 'antd';
const AntFormItem = Form.Item;

import {checkSecurity, hasOwnProp} from'../share'

class FormItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            childrenVisible: false
        }
    }

    static propTypes = {
        labelVertical: React.PropTypes.bool,
        isEasyEdit : React.PropTypes.bool,

    }

    static defaultProps = {
        labelVertical: false,
        isForm: true,
        msg: '点我填写',
        isEasyEdit : true,
        type:'component'
    }

    // toggleFormItem = (event, children) => {
    //     const _that = this;
    //     const _childrenVisible = this.state.childrenVisible;
    //     let input = this.refs.qqq.children[0].children[0];
    //
    //     this.setState({
    //         childrenVisible: !_childrenVisible
    //     },()=>{
    //         input.focus();
    //         input.addEventListener('blur',function () {
    //             _that.setState({
    //                 childrenVisible: false
    //             })
    //         })
    //     })
    //
    // }


    render() {
        let {security, children, labelVertical,type,readonly, labelWidth, label,isEasyEdit, ...props} = this.props
        const {canAccess, readOnly} = checkSecurity(this.props)
        // 检查是否可显示
        if (!canAccess) {
            return <noscript/>
        }
        // 检查是否只读
        if (readOnly) {
            children = React.cloneElement(children, {disabled: true})
            // children = React.Children.map(children, c => {
            //     return React.cloneElement(c, {disabled: true})
            // })
        }


        const _style = label ? {} : {paddingLeft: 0}
        const _class = classnames(
            {"o-form-label--vertical": labelVertical},
            {["o-form-label--" + labelWidth]: labelWidth},
            {"o-form-label--none": (label == " ")}
        )

        const isToChange = typeof children ==="object" && !!children && !!children.props
        let childrenValue = isToChange && (children.props.value || children.props.defaultValue) ;

        // 特殊组件取值
        // TODO 考虑的组件还不够丰富，目前只有radio group 和 checkbox group
        if(isToChange){
            // TODO children 是数组的话就会报错
            if(children.type == Radio.Group){
                let child = children.props.children.filter((child)=> (child.props.value === childrenValue))
                childrenValue = child[0].props.children
            }

            // checkbox
            if(children.type == Checkbox.Group){
                let arr=[]
                childrenValue.forEach(function (item) {
                   children.props.options.forEach(function (child) {
                       child.value == item && arr.push(child.label)
                   })
                })

                if(arr.length > 1){
                    //多个选项
                    childrenValue = arr.map((item,index)=>(<Tag key={index}>{item}</Tag>))
                }else {
                    childrenValue = arr
                }

            }
        }

        const childrenClass = classnames(
            {'none': !this.state.childrenVisible}
        )
        const textClass = classnames(
            {'none': this.state.childrenVisible}
        )

        let _label = label && label


        // let _children = isEasyEdit && !Array.isArray(children) && children.props && !/switch/.test(this.props.children.props.prefixCls) ?
        // <span><span className={textClass} onClick={() => this.toggleFormItem(event, children)}>{childrenValue ? childrenValue : this.props.msg}</span>
        // <span ref='qqq' className={childrenClass}>{children}</span></span>
        //     :
        //     children

        let _children = type === "text" ? <span className={textClass} >{childrenValue}</span> : children

        // console.log(children.props && children.props.value )

        return (
            <AntFormItem
                {...props}
                style={_style}
                label={_label}
                className={_class}
                tyep={type}
                readonly={readonly}
            >
                {_children}
            </AntFormItem>
        )
    }
}

export default FormItem