/**
 * Created by Administrator on 2016/11/1 0001.
 */
import 'ibos/styles/framework.less';
import React, {Component} from 'react'

import {Panel} from 'ibos'
import {Select} from 'antd'
// import router from './router'

function test(a, b) {
    console.log(a,b)
}

export default function Home() {
    return <Panel title="我是 Panel 标题">
        <Select onFirstFocus={test}/>

        <Panel noPadding title="我是 Panel 标题">
        123123
    </Panel>
        <Panel noPadding>
            13123123111sdfsa
        </Panel>
    </Panel>

}