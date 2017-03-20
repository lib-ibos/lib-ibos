/**
 * Created by Administrator on 2016/11/1 0001.
 */
import 'ibos/styles/framework.less';
import React, {Component} from 'react'
import {render}  from 'react-dom';

import Panel from 'ibos/panel'
// import router from './router'

export default function Home() {
    const fn = (<a href="#">其他</a> - <a href="#">关掉</a>);
    return <Panel title="我是 Panel 标题">
        speak async your

        <Panel noPadding title="我是 Panel 标题">
        111111111111111111112221
    </Panel>
        <Panel noPadding>
            222222
        </Panel>
        <Panel noPadding noHeaderBorder title="我是 Panel 标题">
            33333
        </Panel>
        <Panel noPadding  title="我是有fn的panel" fn={fn}>
            33333
        </Panel>
    </Panel>

}