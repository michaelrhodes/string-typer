var mrand = Math.random
var mmax = Math.max

module.exports = function (min, max) {
  return function () {
    return ~~mmax(min, mrand() * max)
  }
}
