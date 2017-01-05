import React, {Component} from 'react';
import classnames  from 'classnames';
//style
import './styles/';


function Panel({transparent,gray,fnInline,style,bodyStyle, noHeaderBorder,noPadding, title,children, ...props}) {
    const prifix = 'panel';
    let panelClass = classnames(
        prifix,
        {
            [prifix+"--transparent"]: transparent,
            [prifix+"--no-header-bd"]: noHeaderBorder,
            [prifix+"--no-padding"]:noPadding,
            [prifix+"--gray"]:gray
        }
    )
    let fnClass = classnames(
        'panel__fn',
        {['panel__fn--inline']:fnInline

    })

    return <div className={panelClass} style={style}>
        {/*有标题才输出*/}
        {title &&
        <div className="panel__header">

            <div className="panel__title">{title}</div>
            {props.fn &&
            <div className={fnClass}>{props.fn}</div>
            }
        </div>
        }
        <div className="panel__body" style={bodyStyle}>
            {children}
        </div>
    </div>
}


export default Panel