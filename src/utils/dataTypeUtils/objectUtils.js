export function isObject(obj) {
    if (typeof obj !== 'object') {
        return false
    }
    return obj === Object(obj);
}

export function isEmpty(obj) {
    if (!isObject(obj)) {
        return true;
    }
    return Object.keys(obj).length === 0;
}