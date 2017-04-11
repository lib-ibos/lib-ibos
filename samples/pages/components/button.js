/**
 * Created by liguangyao on 2017/4/6.
 */
import React, {Component} from 'react'

import {Panel,Button,Split} from 'ibos'

export default function () {
    return <Panel title="按钮 Button">
        <Button  type="primary" size="large">新增</Button>
        <Button size="large">删除</Button>
        <Button type='danger' size="large">删除</Button>
        <Button type='text' size="large">删除</Button>
        <Split space/>
        <Button  type="primary">新增</Button>
        <Button>删除</Button>
        <Button type='danger'>删除</Button>
        <Button type='text'>删除</Button>
        <Split space/>
        <Button  type="primary" size='small'>新增</Button>
        <Button size='small'>删除</Button>
        <Button type='danger' size='small'>删除</Button>
        <Button type='text' size='small'>删除</Button>
        <Split dashed/>

            {`<Button  type="primary" size="large">新增</Button>
            <Button size="large">删除</Button>
            <Button type='danger' size="large">删除</Button>
            <Button type='text' size="large">删除</Button>
            <Split space/>
            <Button  type="primary">新增</Button>
            <Button>删除</Button>
            <Button type='danger'>删除</Button>
            <Button type='text'>删除</Button>
            <Split space/>
            <Button  type="primary" size='small'>新增</Button>
            <Button size='small'>删除</Button>
            <Button type='danger' size='small'>删除</Button>
            <Button type='text' size='small'>删除</Button>`}

    </Panel>

}