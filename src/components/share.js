
const hasOwnProperty = Object.hasOwnProperty

export function noop(){}

export function hasOwnProp(obj, name) {
    return hasOwnProperty.call(obj, name)
}

export function checkSecurity(props) {
    const result = {
       readOnly: false,
       canAccess: true, 
    }
    if (hasOwnProp(props, 'security')) {
        const security = props['security']
        const canRead = security.indexOf('r') > -1
        const canUpdate = security.indexOf('u') > -1
        if (security) {
            result.readOnly = canRead && !canUpdate
            if (!result.readOnly) {
                result.canAccess = canRead && canUpdate
            }
        } else {
           result.canAccess = false
        }
    }
    return result
}

/*只返回数字 */
export function filterNum(val) {
    //return val.replace(/[^-]?\D/, s => '')
    const a = val.match(/-?\d+\.?\d{0,}/)
    return a ? a[0] : ''
}