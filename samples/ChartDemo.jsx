import React, {Component} from 'react'
import Chart from '../components/chart'

const mockData = [
    {x: {value: '一月'}, soldNum: {value: 200}, avaliableNum: {value: 100}, invalidNum: {value: 12}},
    {x: {value: '二月'}, soldNum: {value: 500}, avaliableNum: {value: 70}, invalidNum: {value: 10}},
    {x: {value: '三月'}, soldNum: {value: 240}, avaliableNum: {value: 80}, invalidNum: {value: 20}},
    {x: {value: '四月'}, soldNum: {value: 320}, avaliableNum: {value: 40}, invalidNum: {value: 6}},
    {x: {value: '六月'}, soldNum: {value: 104}, avaliableNum: {value: 70}, invalidNum: {value: 16} },
    {x: {value: '七月'}, soldNum: {value: 270}, avaliableNum: {value: 40}, invalidNum: {value: 18} },
]

class ChartDemo extends Component {

    constructor() {
        super()
        this.state = {show: true}
    }

    handleClick = () => {
        this.setState({show: false})
    }

    render() {
        return (
            <div  >
                <button onClick={this.handleClick}>refresh</button>
                <Chart title="示例1" xAxis="x" dataSource={mockData}  >
                    <Chart.XAxis name="x轴" dataIndex='x' />
                    <Chart.Serie name="售出" type='line' dataIndex='soldNum' />
                    <Chart.Serie name="余量" type='line' dataIndex='avaliableNum' />
                </Chart>
                <Chart title="示例2" xAxis="x" dataSource={mockData}  >
                    <Chart.XAxis name="x轴" dataIndex='x' />
                    <Chart.Serie name="售出" type='bar' dataIndex='soldNum' />
                    <Chart.Serie name="无效" type='bar' dataIndex='invalidNum' />
                </Chart>
                <Chart width={400} title="示例3" xAxis="x" dataSource={mockData}  >
                    <Chart.XAxis name="x轴" dataIndex='x' />
                    <Chart.Serie name="访问来源" type='pie' dataIndex='invalidNum' />
                </Chart>
            </div>
        )
    }
}

export default ChartDemo


