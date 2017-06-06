/**
 * Created by Administrator on 2016/11/1 0001.
 */
import 'ibos/styles/framework.less';
import React, {Component} from 'react'

import {Panel,FormLayout} from 'ibos'
import {Select,Row,Col,Input,Step} from 'antd'
// import router from './router'
const FormItem = FormLayout.FormItem

function test(a, b) {
    console.log(a,b)
}

function selectAfter() {
    
}

export default function Home() {
    return <Panel title="我是 Panel 标题">
        <Select onFirstFocus={test}/>

        <Panel noPadding title="我是 Panel 标题">

    </Panel>
        <Panel noPadding>
            13123123111sdfsa
        </Panel>
    </Panel>

}