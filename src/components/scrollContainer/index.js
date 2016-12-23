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
            activeKey: '0'
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
            activeKey: index
        });
        this._option.tabClicked = true;
    }

    scrollTo = (index) => {
        const cntIndex = index;
        const {cnts, affixHeight, affixTop, affix} = this._option
        const cnt = cnts[cntIndex]
        const offsetTop = this.props.offsetTop ? this.props.offsetTop : 0;

        let scrollNum = getOffset(affix, this.props.target()).top + getOffset(cnt, affix).top - affixHeight - offsetTop;

        document.documentElement.scrollTop = scrollNum //ie
        document.body.scrollTop = scrollNum

    }

    updatePosition = (e) => {
        let scrollDir = this.scrollDirection()
        const scrollTop = getScroll(this.props.target(), true);
        const {tabClicked, affixHeight, cnts, cntsOffestTop, cntsHeight}=this._option
        const offsetTop = this.props.offsetTop ? this.props.offsetTop : 0;
        let cur = 0;
        if (scrollDir === "up") {
            for (let i = cnts.length - 1; i >= 0; i--) {
                //往上滚动到容器一半的位置，就算到聚焦到这个容器
                scrollTop < cntsOffestTop[i] - affixHeight - offsetTop + cntsHeight[i] / 2 && (cur = i);
            }
        } else {
            for (let i = 0, length = cnts.length; i < length; i++) {
                scrollTop >= cntsOffestTop[i] - affixHeight - offsetTop && (cur = i);
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

    componentDidMount() {
        // warning(!('offset' in this.props), '`offset` prop of Affix is deprecated, use `offsetTop` instead.');
        const props = this.props;
        const affix = this.refs.affix.refs.fixedNode
        const affixHeight = affix.offsetHeight
        let childrenSize = props.children.length
        let cnts = [];
        let cntsOffestTop = [];
        let cntsHeight = []

        for (let i = 0; i < childrenSize; i++) {
            let cnt = document.getElementById(props.prefixId + i);
            cnts.push(cnt)
            cntsOffestTop.push(getOffset(cnt, props.target()).top)
            cntsHeight.push(cnt.offsetHeight)
        }

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
            tabClicked: false//当tab点击的时候，避免去触发滚动的高度判断引起的tab聚焦，因为最后一个容器往往滚动不到最上面
        }

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
        let {prefixCls, offsetTop, type, tabTitle, prefixId, size, children, ...props} = this.props;
        let tabChildren = children.map(function (item, index) {
            return <TabPane key={index} tab={item.props.tab}></TabPane>
        })

        let cntChildren = children.map(function (item, index) {
            return <div id={prefixId + index} key={item.key}>{item.props.children}</div>
        })

        let _class = classnames(
            prefixCls
        )

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
                    <Tabs
                        title={tabTitle}
                        type={type}
                        size={size}
                        onTabClick={(index) => this.tabClick(index)}
                        activeKey={this.state.activeKey}
                    >
                        {tabChildren}
                    </Tabs>
                </Affix>
                {cntChildren}
            </div>
        )
    }
}

export default ScrollContainer