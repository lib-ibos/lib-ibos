import React from 'react';
import classnames from 'classnames';

import FormItem from './FormItem'
import './styles/'

function FormLayout({children,labelWidth,inline,inputType, ...props}) {
    const inputSize = props.inputSize || "normal";
    const prifix = 'o-form-item-';
    const _class = classnames(
        'o-form',
        {[prifix+'label--4em']:!labelWidth},
        {[prifix+'label--'+labelWidth]:labelWidth},
        {[prifix+'-inline ant-form-inline']:inline},
        {[prifix+'input--'+inputSize]:inputSize}
    );

    // 传给children的熟悉
    // const _childrenPros = {
    //     type:inputType
    // }


    // 复制children 并赋值额外属性
    // const _children = React.Children.map(children,(child)=>React.cloneElement(child,_childrenPros))

    return <div {...props} className={_class} >{children}</div>
}

FormLayout.FormItem =FormItem;

export default FormLayout