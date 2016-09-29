import React from 'react'

export function Panel({children, ...props}) {
    return <div {...props}>{children}</div>
}