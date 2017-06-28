import React from 'react';
import classnames from 'classnames'
import './styles'
export default props => {
  let { lib,type,color,size, className = '', ...other } = props;
  const preFix = lib === 'ibos' ? 'o-' : 'ant'
  const classNames = classnames(
    className,
    `${preFix}icon`,
    `${preFix}icon-${type}`,
    {
      [`color-${color}`]:color
    }
  );

  const styles = size && {'fontSize':size};

  return <i style={styles} className={classNames} {...other} />;
};