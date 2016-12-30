import React,{PropTypes} from 'react'

export default function Serie() {
    return null
}

Serie.displayName = Serie.name || 'Serie'

Serie.defaultProps = {
    type: 'line'
}

Serie.propTypes = {
    name: PropTypes.string.isRequired,
    dataIndex: PropTypes.string.isRequired,
    type: PropTypes.string,
}