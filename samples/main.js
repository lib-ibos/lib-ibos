// import 'ibos/styles/framework.less';
import React, {Component} from 'react'
import {render}  from 'react-dom';
import { Router, Route, browserHistory,IndexRoute } from 'react-router';

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('fetch-ie8');

import Frame from './widgets/layout/frame'
import Home from './pages/Home'
import Detail from './pages/detail'
import Crm from './pages/crm'
import CrmHome from './pages/crmHome'
import CrmDetail from './pages/crmDetail'
import Footer from './widgets/footer/footer'


import Mock from 'mockjs'
const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'string1|1-5': '★',
        'email':'@email(oly.com)',
        'url':'@url(http,olymtech.com)',
        'city':'@city',
        'date':'@date',
        'time':'@time(HH:mm)'
    }]
})
// 输出结果
console.log(JSON.stringify(data,null,4))
//
//
// Mock.mock('http://g.cn', {
//     'list|3-8': [{'id|+3': 1}]
// })


render(
    <Router history={browserHistory}>
        <Route path="/" component={Frame} >
            <IndexRoute component={Home}/>
            <Route path="/detail" component={Detail} />
            <Route path="/crm" component={Crm} />
            <Route path="/crmHome" component={CrmHome} />
            <Route path="/crmDetail" component={CrmDetail} />
            <Route path="/footer" component={Footer} />
         </Route>
    </Router>,
    document.getElementById("app")
);
