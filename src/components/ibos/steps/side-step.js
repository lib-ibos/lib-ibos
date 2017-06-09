import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';
import classnames  from 'classnames';

function SideStep({children,style,...props}) {
    // console.log(type)
    const prifix = 'o-steps__side-item';
    const _class = classnames(
        prifix
    )
    return <div className='o-steps__side-item' style={style} >{children}</div>
}


export default SideStep