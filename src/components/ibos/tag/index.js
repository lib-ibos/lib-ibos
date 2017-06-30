import React, {Component} from 'react';
import ReactDOM,{render}  from 'react-dom';
import classnames  from 'classnames';
import { Tag as AntTag} from 'antd';

import './styles/index'


class Tag extends Component {

    static defaultProps ={
        prefixCls:"o-tag",
    }


    render() {
        const {children,className,size,hasTag,prefixCls,...props} = this.props;

        const _class = classnames(
            className,
            prefixCls,
            {
                [prefixCls+'--'+size]:/mini|small|middle|large/.test(size),
                [prefixCls+'--has-tag']:hasTag,
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