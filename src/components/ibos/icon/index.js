import React from 'react';
import classnames from 'classnames'
import './styles'
export default props => {
  let { type,color,size, className = '', ...other } = props;
  const classNames = classnames(
    className,
    `o-icon`,
    `o-icon-${type}`,
    {
      [`color-${color}`]:color
    }
  )

  const styles = size && {'fontSize':size};

  return <i style={styles} className={classNames} {...other} />;
};