
exports.extend = function(from, to) {
    for (let key in from) {
        to[key] = from[key]
    }
}

exports.isObject = function(data) {
    return data !== null && typeof data == 'object'
}
