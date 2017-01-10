import React, {Component} from 'react';
import classnames  from 'classnames';
//style
import './styles/';


function split({type,dashed,space,vertical,style,...props}) {
    // console.log(type)
    const prifix = 'hr';
    const _class = classnames(
        prifix,
        {
            [prifix+"--dashed"]: dashed,
            [prifix+"--space"]: space,
            [prifix+"--vertical"]: vertical,
        }
    )
    return <hr className={_class} style={style} />
}

export default split