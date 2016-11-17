import React from 'react';
import classnames from 'classnames';

import FormItem from './FormItem'
import './styles/'

function FormLayout({children,labelWidth, ...props}) {
    const inputSize = props.inputSize || "normal";
    const prifix = 'o-form-item-';
    const _class = classnames(
        'o-form',
        {[prifix+'label--4em']:!labelWidth},
        {[prifix+'label--'+labelWidth]:labelWidth},
        {[prifix+'input--'+inputSize]:inputSize}
    );
    return <div {...props} className={_class} >{children}</div>
}

FormLayout.FormItem =FormItem;

export default FormLayout