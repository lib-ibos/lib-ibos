import React, {Component} from 'react';
import classnames  from 'classnames';
//style
import './styles/';


function Panel({transparent,small, large,gray, fnInline,miniTitle,line, style, bodyStyle, noMargin, noHeaderBorder, noPadding, title, children, ...props}) {
    const prifix = 'panel';
    let panelClass = classnames(
        prifix,
        {
            [prifix + "--transparent"]: transparent,
            [prifix + "--no-header-bd"]: noHeaderBorder,
            [prifix + "--no-padding"]: noPadding,
            [prifix + "--no-margin"]: noMargin,
            [prifix + "--mini-title"]: miniTitle,
            [prifix + "--line"]: line,
            [prifix + "--gray"]: gray,
            [prifix + "--small"]: small,
            [prifix + "--large"]: large,
        }
    )

    let fnClass = classnames(
        'panel__fn',
        {
            ['panel__fn--inline']: fnInline

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