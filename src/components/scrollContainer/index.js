import React, {Component} from 'react';
import ReactDOM, {render}  from 'react-dom';
import classnames  from 'classnames';
import {Affix} from 'antd'
import Tabs from '../Tabs'
const TabPane = Tabs.TabPane
import addEventListener from 'rc-util/lib/Dom/addEventListener';
//style
import './styles/';

function getScroll(target, top) {
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;

    let ret = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== 'number') {
        ret = window.document.documentElement[method];
    }

    return ret;
}

function getTargetRect(target) {
    return target !== window ?
        target.getBoundingClientRect() :
        {top: 0, left: 0, bottom: 0};
}

function sortACS(data) {
    return data.sort(function (a, b) {
        return a > b ? 1 : -1
    })
}

function getOffset(element, target) {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);

    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
        top: elemRect.top - targetRect.top +
        scrollTop - clientTop,
        left: elemRect.left - targetRect.left +
        scrollLeft - clientLeft,
    };
}

class ScrollContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeKey: '0',
            cntChildren:null,
            tabsChanged:false
        }
    }

    static defaultProps = {
        prefixCls: 'o-scroll-container',
        target() {
            return window;
        },
        prefixId: 'scrollContainer_',
        type: 'card',
        size: 'default'
    }

    affixChange = () => {
    }

    tabClick = (index) => {
        this.scrollTo(index)
        this.setState({
            activeKey: index,
        });
        this._option.tabClicked = true;
    }

    scrollTo = (index) => {
        const cntIndex = index;
        const { affixHeight, affixTop, affix} = this._option
        const cnt = document.getElementById(this.props.prefixId + cntIndex)
        const offsetTop = this.props.offsetTop ? this.props.offsetTop : 0;

        let scrollNum = getOffset(affix, this.props.target()).top + getOffset(cnt, affix).top - affixHeight - offsetTop;

        document.documentElement.scrollTop = scrollNum //ie
        document.body.scrollTop = scrollNum
    }

    updatePosition = (e) => {
        const that = this
        let scrollDir = this.scrollDirection()
        const scrollTop = getScroll(this.props.target(), true);
        const {tabClicked, affixHeight, cnts, cntsOffestTop, cntsHeight}=this._option

        const offsetTop = this.props.offsetTop ? this.props.offsetTop : 0;
        let cur = 0;

        function getIndex (index){
            let reg = new RegExp(that.props.prefixId)
            return cnts[index].id.replace(reg,'')
        }

        if (scrollDir === "up") {
            for (let i = cnts.length - 1; i >= 0; i--) {
                //往上滚动到容器一半的位置，就算到聚焦到这个容器
                scrollTop < cntsOffestTop[i] - affixHeight - offsetTop + cntsHeight[i] / 2 && (cur = getIndex(i));
            }
        } else {
            for (let i = 0, length = cnts.length; i < length; i++) {
                scrollTop >= cntsOffestTop[i] - affixHeight - offsetTop && (cur = getIndex(i));
            }
        }

        // 每 setState 一次，就会render一次，当值一样的时候就不触发 setState
        if (this.state.activeKey != cur) {
            if (!tabClicked) {//以点击事件的tab聚焦为优先
                this.setState({
                    activeKey: cur.toString()
                });
            }
            this._option.tabClicked = false
        }

    }

    //判断向上还是向下滚动页面
    scrollDirection = () => {
        const scrollTop = getScroll(this.props.target(), true);

        if (scrollTop > this._option.lastScrollTop) {
            this._option.scrollDir = "down"
        } else if (scrollTop == this._option.lastScrollTop) {
        }//ie下经常出现相同的值，相同的时候就默认当前的方向
        else {
            this._option.scrollDir = "up"
        }
        this._option.lastScrollTop = scrollTop;
        return this._option.scrollDir
    }

    initChildren = (visibleList,callback)=>{
        let { prefixId,  children} = this.props;
        const cntChildren = []
        const list = sortACS(visibleList)
        list.forEach(function (item,index) {
            cntChildren.push(<div id={prefixId + item} key={children[item].key}>{children[item].props.children}</div>)
        })

        this.setState({
            cntChildren:cntChildren
        })

        return cntChildren
    }

    initComponet = (visibleList)=>{
        const props = this.props;
        const affix = this.refs.affix.refs.fixedNode
        const affixHeight = affix.offsetHeight
        let cnts = [];
        let cntsOffestTop = [];
        let cntsHeight = []
        const list = sortACS(visibleList)

        list.forEach(function (item,index) {
                let cnt = document.getElementById(props.prefixId + item);
                cnts.push(cnt)
                cntsOffestTop.push(getOffset(cnt, props.target()).top)
                cntsHeight.push(cnt.offsetHeight)
        })

        const target = props.target;
        this.setTargetEventListeners(target);
        this._option = {
            scrollDir: '',//滚动方向 up / down
            lastScrollTop: 0,
            cnts: cnts, // 容器
            cntsOffestTop: cntsOffestTop,
            cntsHeight: cntsHeight,
            affix: affix, // tab
            affixHeight: affixHeight,
            affixTop: getOffset(affix, target()).top,
            selectKeys:list,
            tabClicked: false//当tab点击的时候，避免去触发滚动的高度判断引起的tab聚焦，因为最后一个容器往往滚动不到最上面
        }

        this.state.tabsChanged && this.setState({
            tabsChanged:false
        })
    }

    tabsOnConfirm =(selectKeys)=>{
        this.initChildren(selectKeys)
        this._option.selectKeys = selectKeys
        this.setState({
            tabsChanged:true
        })
    }

    componentWillMount(){
        const visibleList = []
        this.props.children.forEach(function (item, index) {
            return !!!item.props.hidden && visibleList.push(index)
        })

        this.initChildren(visibleList)
    }

    componentDidMount() {
        // warning(!('offset' in this.props), '`offset` prop of Affix is deprecated, use `offsetTop` instead.');
        const visibleList =[]
        this.props.children.forEach(function (item, index) {
            const isHidden = !!item.props.hidden
            !isHidden && visibleList.push(index)
        })
        this.initComponet(visibleList)
    }

    componentDidUpdate(){
        this.state.tabsChanged && this.initComponet(this._option.selectKeys)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            this.clearScrollEventListeners();
            this.setTargetEventListeners(nextProps.target);

            // Mock Event object.
            this.updatePosition({});
        }
    }

    componentWillUnmount() {
        this.clearScrollEventListeners();
    }

    setTargetEventListeners(getTarget) {
        const target = getTarget();
        this.scrollEvent = addEventListener(target, 'scroll', this.updatePosition);
        this.resizeEvent = addEventListener(target, 'resize', this.updatePosition);
    }

    clearScrollEventListeners() {
        ['scrollEvent', 'resizeEvent'].forEach((name) => {
            if (this[name]) {
                this[name].remove();
            }
        });
    }

    render() {

        let {prefixCls,addTabsItemText,offsetTop, type, tabsTitle, prefixId, size, children, ...props} = this.props;
        let tabChildren = children.map(function (item, index) {
            return <TabPane key={index} tab={item.props.tab} hidden={!!item.props.hidden}></TabPane>
        })


        let _class = classnames(
            prefixCls
        )

        const fixId = prefixId +('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase()

        return (
            <div
                {...props}
                className={_class}
            >
                <Affix
                    ref="affix"
                    onChange={this.affixChange}
                    offsetTop={offsetTop}
                >
                    <span id={fixId} style={{position:'relative'}}>
                    <Tabs
                        ref="tabs"
                        title={tabsTitle}
                        type={type}
                        size={size}
                        onTabClick={(index) => this.tabClick(index)}
                        activeKey={this.state.activeKey}
                        addTabsItemText={addTabsItemText}
                        onConfirm = {this.tabsOnConfirm}
                        dropdownContainer={()=>document.getElementById(fixId)}
                    >
                        {tabChildren}
                    </Tabs>
                        </span>
                </Affix>
                {this.state.cntChildren}
            </div>
        )
    }
}

export default ScrollContainer