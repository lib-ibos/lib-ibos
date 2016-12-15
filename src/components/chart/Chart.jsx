import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';


import echarts from 'echarts/lib/echarts'

// 柱状图
import 'echarts/lib/chart/bar'
// 折线图
import 'echarts/lib/chart/line'
// 饼图
import 'echarts/lib/chart/pie'

// ie8
import 'zrender/lib/vml/vml'
// tooltip
import 'echarts/lib/component/tooltip'
// legend
import 'echarts/lib/component/legend'
// title
import 'echarts/lib/component/title'


import addResizeListener, {removeResizeListener} from './element-resize'


class Chart extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string,
        dataSource: PropTypes.array.isRequired,
        
        notMerge: PropTypes.bool,
        lazyUpdate: PropTypes.bool,

        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        style: PropTypes.object,
        className: PropTypes.string,
        theme: PropTypes.string,
        showLoading: PropTypes.bool,
    }

    static defaultProps = {
        width: '100%',
        height: 300,
    }

    componentDidMount() {
        this.renderChart()
        // on resize
        addResizeListener(this.el, this.resize);
    }

    componentDidUpdate() {
        this.renderChart()
    }

    componentWillUnmount() {
        removeResizeListener(this.el, this.resize)
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState)
    }

    getInstance() {
        return this.chart
    }

    setOption() {
        const {notMerge, lazyUpdate} = this.props
        const opt = this.getOption()
        this.chart.setOption(opt, notMerge, lazyUpdate )
    }

    renderChart() {
        this.chart = echarts.getInstanceByDom(this.el) || echarts.init(this.el)
        this.setOption()
    }

    resize = () => {
        this.chart.resize()
    }

    getOption = () => {
        const {title, children, dataSource } = this.props
        let legendData = []
        let isPie = false
        const getValue = (item, prop) => {
            const obj = item[prop]
            if (obj) {
                return obj.value
            }
            console.warn(prop + ' 属性不存在了!')
        }
        
        let hash = {
            isPie: false,
            xAxisProps: {},
            serieProps: [],
            XAxisHandle: function(props) {
                this.xAxisProps = props
            },
            SerieHandle: function(props) {
                this.serieProps.push(props) 
            },
            getLineOrBarOption: function() {
                let legendData = []
                let xAxisData = dataSource.map(item => getValue(item, this.xAxisProps.dataIndex))
                const series = this.serieProps.map(props => {
                    const {dataIndex, name, type} = props
                    legendData.push(name)
                    return {
                        name,
                        type,
                        data: dataSource.map(item => getValue(item, dataIndex))
                    }
                })
                return {
                    title: {
                        text: title,
                        x:'10%'
                    },
                    tooltip: {
                        trigger: 'axis',       
                        // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        //     type : type === 'line' ? 'line' : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        // }
                    },
                    legend: {
                        data: legendData
                    },
                    xAxis: {
                        data: xAxisData
                    },
                    yAxis: {},
                    series
                }                
            },
            getPieOption: function(dataSource) {
                let legendData = dataSource.map(item => getValue(item, this.xAxisProps.dataIndex))
                const series = this.serieProps.map(props => {
                    const {dataIndex, name, type} = props
                    return {
                        name,
                        type,
                        radius: '50%',
                        data: dataSource.map(item => ({
                            value: getValue(item, dataIndex), 
                            name: getValue(item, this.xAxisProps.dataIndex)
                        }))
                    }
                })
                return {
                    title: {
                        text: title,
                        x:'10%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"      
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        data: legendData,
                    },
                    series                
                }
            },
            getOption: function(dataSource) {
                return this.isPie ? this.getPieOption(dataSource) : this.getLineOrBarOption(dataSource)
            }
        }
        React.Children.forEach(children, child => {
            const name = child.type.name
            if (name === 'Serie') {
                if (child.props.type ==='pie') {
                    hash.isPie = true
                } else if (hash.isPie) {
                    throw new Error('暂不支持饼图与其他图混用')
                }
            }
            hash[`${name}Handle`](child.props)
        })

        if (!hash.xAxisProps.dataIndex) {
            throw new Error("必须配置XAxis")
        }
        
        return hash.getOption(dataSource)
    }

    render() {
        const {width, height, style} = this.props
        let _style = {width, height, ...style}
        return <div ref={el=> this.el = el} style={_style}/>
    }
}

export default Chart
