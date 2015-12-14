var type = require('./')

var initial = 'naïve is used to describe an individual'

process.stdout.write(initial)

setTimeout(function () {
  var opt = { initial: initial }
  type('naïve typing simulation is kewl 😉 ', opt, function (typed, done) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(typed)
    if (done) setTimeout(function () {
      process.stdout.write('\n')
    }, 250)
  })
}, 500)
