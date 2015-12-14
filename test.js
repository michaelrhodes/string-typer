var test = require('tape')
var type = require('./')

test('it works', function (assert) {
  var input = 'aw yiss, it works'
  var i = 0
  var length = input.length

  assert.plan(length + 1)
  type(input, function (typed, done) {
    assert.equal(typed, input.substr(0, ++i), typed)
    if (done) assert.ok(done, 'it finished')
  })
})

test('it works with delay range options', function (assert) {
  var input = 'aw yiss, it works'
  var delay = { min: 10, max: 30 }
  var delays = []
  var start = +new Date

  type(input, delay, function (typed, done) {
    delays.push(+new Date - start)
    start = +new Date
    if (done) check(delays.slice(1))
  })

  function check (delays) {
    var average = ~~(delays.reduce(add, 0) / delays.length)
    var close = (
      average >= delay.min &&
      average <= delay.max
    )
    var msg = '{a}ms is within our specified range'
      .replace('{a}', average)

    assert.ok(close, msg)
    assert.end()
  }

  function add (a, b) {
    return a + b
  }
})
