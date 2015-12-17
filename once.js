var substr = require('unicode-string/substr')
var length = require('unicode-string/length')
var delayer = require('./delay')

function once (string, opt, onchange) {
  if (typeof opt == 'function') {
    onchange = opt
    opt = {}
  }

  var t = null
  var done = false
  var matching = false
  var initial = opt.initial
  var typed = ''

  // Set keystroke delay range
  opt.min = isNaN(opt.min) ? 40 : opt.min
  opt.max = isNaN(opt.max) ? 80 : opt.max
  var delay = delayer(opt.min, opt.max)

  initial ? backspace() : type(1)

  function backspace (end) {
    typed = substr(initial, 0, end)
    end = length(typed)
    matching = initial != string && string.indexOf(typed) == 0
    onchange(typed, done)

    matching || end == 0 ?
      t = setTimeout(type, delay(), end) :
      t = setTimeout(backspace, delay(), end - 1)
  }

  function type (end) {
    typed = substr(string, 0, end)
    end = length(typed)
    done = typed == string
    onchange(typed, done)

    if (!done) {
      t = setTimeout(type, delay(), end + 1)
    }
  }

  return function () {
    clearTimeout(t)
    onchange(typed, true)
  }
}

module.exports = once
