import React, {Component} from 'react';
import classnames  from 'classnames';
//style
import './styles/';


function split({type,style,...props}) {
    // console.log(type)
    const prifix = 'hr';
    const _class = classnames(
        prifix,
        {
            [prifix+"--dashed"]: type == "dashed" || props.dashed,
            [prifix+"--space"]: type == "space" || props.space
        }
    )
    return <hr className={_class} style={style} />
}

export default split