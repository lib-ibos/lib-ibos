import React from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import './style/index'

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstFocus: true,
        };
    }

  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false
  }

  static contextTypes = {
    antLocale: React.PropTypes.object,
  }

  render() {
    let {
      size, className, combobox, notFoundContent, prefixCls, showSearch, optionLabelProp,onFirstFocus
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: showSearch,
    });

    const { antLocale } = this.context;
    if (antLocale && antLocale.Select) {
      notFoundContent = notFoundContent || antLocale.Select.notFoundContent;
    }

    if (combobox) {
      notFoundContent = null;
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    return (
      <RcSelect {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={notFoundContent}
        onFocus = {()=>this.handlerfirstClick()} // by FEN 为了解决第一次点击的时候不出数据
      />
    );
  }

  handlerfirstClick(){
    if(this.state.isFirstFocus){
        this.props.onFirstFocus && this.props.onFirstFocus();
        this.setState({
            isFirstFocus:false
        })
    }
  }
}
