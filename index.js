var mrand = Math.random
var mmax = Math.max

function typer (string, opt, onchange) {
  if (typeof opt == 'function') {
    onchange = opt
    opt = {}
  }

  var typed = ''
  var done = false
  var chars = string.toString().split('')
  var delay = delayer(opt.min, opt.max)

  type()

  function type () {
    typed += chars.shift()
    done = typed == string
    onchange(typed, done)

    if (chars.length) {
      setTimeout(type, delay())
    }
  }
}

function delayer (min, max) {
  min = isNaN(min) ? 40 : min
  max = isNaN(max) ? 80 : max
  return function () {
    return ~~mmax(min, mrand() * max)
  }
}

module.exports = typer
