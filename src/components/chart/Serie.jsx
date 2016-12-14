import React,{PropTypes} from 'react'

export default function Serie() {
    return null
}

Serie.defaultProps = {
    type: 'line'
}

Serie.propTypes = {
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
}