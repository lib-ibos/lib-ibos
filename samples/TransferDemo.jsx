import React,{Component} from 'react'
import '../components/table/style.css'
import Transfer from '../components/table/CustomTransfer'

const dataSource = [
    {key: "id", title: "序号"},
    {key: "name", title: "姓名"},
    {key: "age", title: "年龄"},
    {key: "gender", title: "性别"},
    {key: "address", title: "地址"},
    {key: "birthDay", title: "生日"},
    {key: "qq", title: "QQ"},
    {key: "email", title: "邮箱"}
]

class TransferDemo extends Component {

    constructor(props){
        super(props)
        this.state = {
            targetKeys: ["name", "age", "gender"],
            selectedKeys: [],
        }
    }

    handleChange = (targetKeys) => {
        this.setState({targetKeys})
    }

    handleSelectChange = (selectedItem, checked) => {
        const {targetKeys, selectedKeys} = this.state
        if (targetKeys.indexOf(selectedItem.key) > -1) {
            if (checked) {
                this.setState({selectedKeys: selectedKeys.concat(selectedItem.key)}) 
            } else {
                this.setState({selectedKeys: selectedKeys.filter(key => key !== selectedItem.key)}) 
            }
        }
    }

    renderItem = (item) => {
        // const customLabel = (
        //     <span onClick={() => this.handleSelect(item.key)} >
        //         {item.title}
        //     </span>
        // )
        return  {
            label: item.title, // for displayed item
            value: item.title,   // for title and filter matching
        };
    }

    render() {
        console.log(this.state.selectedKeys)
        return (
            <Transfer 
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                onSelectChange={this.handleSelectChange}
                dataSource={dataSource}
                render={this.renderItem}
            />
        )

    }
}

export default TransferDemo