import React, {Component} from 'react';
import classnames  from 'classnames';
//style
import './styles/';


function Panel({isTransparent, noHeaderBorder,noPadding, title,children, ...props}) {
    const prifix = 'panel';
    const _class = classnames(
        prifix,
        {
            [prifix+"--transparent"]: isTransparent,
            [prifix+"--no-header-bd"]: noHeaderBorder,
            [prifix+"--no-padding"]:noPadding
        }
    )
    return <div className={_class}>
        {/*有标题才输出*/}
        {title &&
        <div className="panel__header">
            {props.fn &&
            <div className="panel__fn">{props.fn}</div>
            }
            <div className="panel__title">{title}</div>
        </div>
        }
        <div className="panel__body">
            {children}
        </div>
    </div>
}


export default Panel