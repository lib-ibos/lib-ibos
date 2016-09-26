import {Button as AntdButton} from 'antd'

function Button({label, ...props}) {
    return <AntdButton {...props}>{label}</AntdButton>
} 

export default Button