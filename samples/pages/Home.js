/**
 * Created by Administrator on 2016/11/1 0001.
 */
import 'ibos/styles/framework.less';
import React, {Component} from 'react'

import {Panel} from 'ibos'
// import router from './router'

export default function Home() {
    return <Panel title="我是 Panel 标题">
        speak async your

        <Panel noPadding title="我是 Panel 标题">
        123123
    </Panel>
        <Panel noPadding>
            13123123111sdfsa
        </Panel>
    </Panel>

}