# 多列下拉选择

## API

成员 | 说明 | 类型 | 默认值
---|---|---|---
onSelect|argument[0]为选择的对象|Fuction|-
selectKey|把哪个key中的值选到输入框中| string| value
dataHead|下拉菜单的heande|object|-
dataBody|下拉菜单菜单选项|string|Not Found
type|input和textarea两种|string|input
rows|type为textarea的时候可以设几行|number|2
autosize|autosize={{ minRows: 2, maxRows: 6 }}|object|--
onBlur|失焦后触发事件|fuction|--
dropdwonMaxRows|指定下拉菜单的显示几行出滚动条，默认在样式中设置了8行的高度|number|8
