# Dropdown 
支持多选,并继承 ant 中 Dropdown 的所有方法和属性

## Antd API
 [Antd Dropdown API](http://1x.ant.design/components/dropdown/)

## 扩展API

成员 | 说明 | 类型 | 默认值
---|---|---|---
multiple|多选型下拉菜单|Boole|-
uniqueSelect|必须选择一项,和 multiple 一起使用|Boole|-
onConfirm|下拉菜单中的确定按钮事件，第一个参数返回选中的键值，和 multiple 一起使用|Function | -
dropdownStyle|下拉菜单的style属性 | Object | -

```
<Dropdown
	trigger={['click']}
	overlay={menu}
	multiple
	selectedKeys={list}
	dropdownStyle={dropdownStyle}
	onConfirm={this.handlerDropdownConfirm}
	uniqueSelect
	>
    点我下拉
</Dropdown>
```