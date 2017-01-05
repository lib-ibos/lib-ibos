import React,{PropTypes} from 'react'

export default function XAxis() {
    return null
}

XAxis.displayName = XAxis.name || 'XAxis'

XAxis.propTypes = {
    name: PropTypes.string,
    dataIndex: PropTypes.string.isRequired,
}