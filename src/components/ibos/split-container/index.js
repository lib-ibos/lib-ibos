import React, {Component} from 'react';
import classnames  from 'classnames';
//style
import './styles/';


function SplitContainer({size, children, ...props}) {
    const prifix = 'split-container';
    let className = classnames(
        prifix,
        {
            [prifix + "--"+ size]: size,
        }
    )


    return <div className={className} {...props}>{children}</div>
}


export default SplitContainer