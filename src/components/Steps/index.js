import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';
import classnames  from 'classnames';
// import RcSteps from 'rc-steps'
import {Steps as RcSteps} from 'antd'

//style
import './styles/';

class Steps extends Component {

    static Step = RcSteps.Step;

    static defaultProps = {
        prefixCls: 'ant-steps',
        iconPrefix: 'ant',
        current: 0,
        className:'test'
    }


    render() {
        const {className,transparent} = this.props

        const _class = classnames(
            className,
            {'o-steps':transparent}
        )

        return (
            <RcSteps {...this.props} className={_class} />
        )
    }
}


export default Steps