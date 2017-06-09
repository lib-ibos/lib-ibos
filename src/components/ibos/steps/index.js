import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';
import classnames  from 'classnames';
// import RcSteps from 'rc-steps'
import {Steps as RcSteps} from 'antd'
import SideStep from './side-step'
// import Step from './step'
// RcSteps.Step = Step;

//style
import './styles/';

class Steps extends Component {

    static Step = RcSteps.Step;

    static defaultProps = {
        prefixCls: 'ant-steps',
        iconPrefix: 'ant',
        current: 0,
        className:'test',
        hasSide:false
    };


    render() {
        const {className,transparent,hasSide} = this.props

        const _class = classnames(
            className,
            {
                'o-steps':transparent,
                'o-steps--has-side':hasSide
            });

        return (
            <RcSteps {...this.props} className={_class} />
        )
    }
}

Steps.SideStep = SideStep;

export default Steps