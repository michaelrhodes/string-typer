var mrand = Math.random
var mmax = Math.max

function typer (string, opt, onchange) {
  if (typeof opt == 'function') {
    onchange = opt
    opt = {}
  }

  var done = false
  var matching = false
  var chars = string.toString().split('')
  var delay = delayer(opt.min, opt.max)
  var typed = opt.initial || ''

  typed ?
    backspace() :
    type()

  function backspace () {
    typed = typed.substr(0, typed.length - 1)
    matching = string.indexOf(typed) == 0
    onchange(typed, done)

    if (matching) {
      chars = chars.slice(typed.length)
      setTimeout(type, delay())
      return
    }

    if (typed.length) {
      setTimeout(backspace, delay())
    }
  }

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
