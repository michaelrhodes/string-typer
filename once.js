var delayer = require('./delay')

function once (string, opt, onchange) {
  if (typeof opt == 'function') {
    onchange = opt
    opt = {}
  }

  string = string + ''
  var done = false
  var matching = false
  var initial = opt.initial + ''
  var typed = ''

  // Set keystroke delay range
  opt.min = isNaN(opt.min) ? 40 : opt.min
  opt.max = isNaN(opt.max) ? 80 : opt.max
  var delay = delayer(opt.min, opt.max)

  initial ? backspace() : type()

  function backspace (end) {
    typed = initial.substr(0, end)
    end = typed.length
    matching = initial != string && string.indexOf(typed) == 0
    onchange(typed, done)

    matching || end == 0 ?
      setTimeout(type, delay(), end) :
      setTimeout(backspace, delay(), end - 1)
  }

  function type (end) {
    typed = string.substr(0, end)
    end = typed.length
    done = typed == string
    onchange(typed, done)

    if (!done) {
      setTimeout(type, delay(), end + 1)
    }
  }
}

module.exports = once
