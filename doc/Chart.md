
### 如何使用？

```js

const mockData = [
    {x: {value: '一月'}, soldNum: {value: 200}, avaliableNum: {value: 100}, invalidNum: {value: 12}},
    {x: {value: '二月'}, soldNum: {value: 500}, avaliableNum: {value: 70}, invalidNum: {value: 10}},
    {x: {value: '三月'}, soldNum: {value: 240}, avaliableNum: {value: 80}, invalidNum: {value: 20}},
    {x: {value: '四月'}, soldNum: {value: 300}, avaliableNum: {value: 40}, invalidNum: {value: 6}},
    {x: {value: '六月'}, soldNum: {value: 100}, avaliableNum: {value: 70}, invalidNum: {value: 16} },
    {x: {value: '七月'}, soldNum: {value: 270}, avaliableNum: {value: 40}, invalidNum: {value: 18} },
]


class App extends Component {

    render() {
        return (
            <div>
                <Chart title="示例1" dataSource={mockData}  >
                    <Chart.XAxis name="x轴" dataIndex='x' />
                    <Chart.Serie name="售出" type='line' dataIndex='soldNum' />
                    <Chart.Serie name="余量" type='line' dataIndex='avaliableNum' />
                </Chart>
                <Chart title="示例2" dataSource={mockData}  >
                    <Chart.XAxis name="x轴" dataIndex='x' />
                    <Chart.Serie name="售出" type='bar' dataIndex='soldNum' />
                    <Chart.Serie name="无效" type='bar' dataIndex='invalidNum' />
                </Chart>
                <Chart width={400} title="示例3" dataSource={mockData}  >
                    <Chart.XAxis name="x轴" dataIndex='x' />
                    <Chart.Serie name="访问来源" type='pie' dataIndex='invalidNum' />
                </Chart>
            </div>
        )
    }

}

ReactDOM.render(<App/>, document.getElementById('root'))

```