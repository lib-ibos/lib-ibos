import React, {Component} from 'react';
import ReactDOM,{render}  from 'react-dom';
import classnames  from 'classnames';
import { Tag as AntTag} from 'antd';

import './styles/index'



//props selectKey 指定一个key的值填入input中
class Tag extends Component {

    static defaultProps ={
        prefixCls:"o-tag",
    }


    render() {
        const {children,className,size,prefixCls,...props} = this.props;

        const _class = classnames(
            className,
            prefixCls,
            {[prefixCls+'--'+size]:/small|middle|large/.test(size)
        })

        return (
            <AntTag
                {...props}
                className={_class}
            >
                {children}
            </AntTag>
        );
    }
}

export default Tag;