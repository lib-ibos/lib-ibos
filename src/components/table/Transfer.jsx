import React,{Component} from 'react'
import {Transfer} from 'antd'

const titles = ['可选', '已选']

class Transfer extends Component {

    constructor(props){
        super(props)
        this.state = {
            targetKeys: [],
            selectedKeys: [],
        }
    }

    handleSelect = (selectedKey) => {
        let selectedKeys = this.state.selectedKeys.concat()
        const idx = selectedKeys.indexOf(selectedKey)
        const exists = idx > -1
        if (exists) {
            selectedKeys.splice()
            if (selectedKey !== this.state.selectedKey) {
                this.setState({selectedKey})
            }
        } else {
            this.setState({selectedKey: ''})
        }
    }

    renderItem = (item) => {
        const {targetKeys} = this.state
        const {columnKeys} = form.getFieldsValue(['columnKeys'])
        const cls = classNames({
            'transfer-updown-item-selected': item.key === selectedKey
        })
        const customLabel = (
            <span className={cls} onClick={() => this.handleSelect(item.key)} >
                {item.title}
            </span>
        )
        return  {
            label:customLabel, // for displayed item
            value: item.title,   // for title and filter matching
        };
    }

    render() {

        return (
            <Transfer 
                targetKeys={this.state.targetKeys}
                titles={titles}
                dataSource={dataSource}
                render={this.renderItem}
                listStyle={{width: 180, height: 300}}
            />
        )

    }
}

export default Transfer