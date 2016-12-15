import React from 'react'

export default function Wrap({children, ...props}) {
    return <div {...props}>{children}</div>
}