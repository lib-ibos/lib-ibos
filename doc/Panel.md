# Panel 

## API
```
<Panel 
    title="运费条款" 
    fn={<a>+ 添加条款</a>}
    noPadding
    noHeaderBorder
    fnInline
    gray
    small
>
    children
</Panel>
```

成员 | 说明 | 类型 | 默认值
----|----|----|----
transparent|是否透明|-|-
noHeaderBorder|标题下是否有下划线| -| -
noPadding|是否有padding 间距|-|-
title|标题|string|-
fn|右上角的操作区域|React.Element|-
style|panel自定义样式|Object|-
bodyStyle|panel body自定义样式|Object|-
fnInline|功能区跟在title后面|-|-
gray|灰底色|-|-
small|小间距|-|-
