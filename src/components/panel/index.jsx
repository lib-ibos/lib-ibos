import React from 'react'

export default function Panel({children, ...props}) {
    return <div {...props}>{children}</div>
}