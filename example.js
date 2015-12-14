var type = require('./')

type('naïve typing simulation is kewl', function (typed, done) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(typed)
  if (done) process.stdout.write('\n')
})
