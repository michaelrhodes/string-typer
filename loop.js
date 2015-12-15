var delayer = require('./delay')
var type = require('./once')

function loop (array, opt, onchange) {
  if (typeof opt == 'function') {
    onchange = opt
    opt = {}
  }

  opt.cmin = isNaN(opt.cmin) ? 300 : opt.cmin
  opt.cmax = isNaN(opt.cmax) ? 800 : opt.cmax
  var delay = delayer(opt.cmin, opt.cmax)
  var last = array.length - 1

  ;(function next (i, initial) {
    opt.initial = initial
    type(array[i], opt, function (typed, done) {
      onchange(typed)
      if (done) setTimeout(
        next, delay(),
        // Next string
        ++i > last ? 0 : i,
        // Initial string
        typed
      )
    })
  })(0, opt.initial)
}

module.exports = loop
