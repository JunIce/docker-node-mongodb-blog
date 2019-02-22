exports.formatTime = function(t) {
    console.log(t)
    let date = new Date(parseInt(t))
    return `${date.getMonth() + 1}月${date.getDate()}日`
}