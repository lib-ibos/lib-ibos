
const hasOwnProperty = Object.hasOwnProperty

export function noop(){}

export function hasOwnProp(obj, name) {
    return hasOwnProperty.call(obj, name)
}

export function canRender(props) {
    return hasOwnProp(props, 'security') ? props['security'] : true
}