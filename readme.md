# string-typer

A tiny, environment-agnostic, string typing simulator.

[![Build status](https://travis-ci.org/michaelrhodes/string-typer.svg?branch=master)](https://travis-ci.org/michaelrhodes/string-typer)

There are a bunch of these things, but they tend to be tied to the DOM or full of opinions. This is just a simple function that takes a string and a callback, and calls that callback for each character, at a random interval, until the string is reproduced. Sound complex? That’s just me being a poor writer. But check out the usage examples.

## Install

```sh
$ npm install string-typer
```

## Usage

### Basic

#### On the command line

```js
var type = require('string-typer/once')

type('naïve typing simulation is kewl', function (typed, done) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(typed)
  if (done) process.stdout.write('\n')
})
```

#### In the browser

```js
var type = require('string-typer/once')
var field = document.querySelector('input[type=text]')

type('this is how you use a text field', function (typed) {
  field.setAttribute('placeholder', typed)
})
```

#### Stopping prematurely

Works in both environments.

```js
var type = require('string-typer/once')
var field = document.querySelector('input[type=text]')

var stop = type('this is how you use a text field', function (typed) {
  field.setAttribute('placeholder', typed)
})

field.oninput = stop
```

### Advanced

Set the range of possibly keystroke delays:

```js
var type = require('string-typer/once')

var delay = { min: 350, max: 1000 }

type('type this really slow', delay, function (typed) {
  document.title = typed
})
```

Overwrite an initial string:

```js
var type = require('string-typer/once')

var opts = {
  initial: 'type this somewhat fast',
  min: 350,
  max: 1000
}

type('type this really slow', opts, function (typed) {
  // Hard to document this in writing, but you
  // would see “somewhat fast” backspaced and
  // replaced with “really slow”

  document.body.textContent = typed
})
```

#### Looping

```js
var type = require('string-typer/loop')

var text = [
  'type this really slow',
  'type this somewhat fast'
]

var opts = {
  initial: 'type this somewhat fast',
  min: 350,
  max: 1000
}

var stop = type(text, opts, function (typed, stopped) {
  document.body.textContent = typed

  if (stopped) {
    alert('aw man!')
  }
})

document.documentElement.onclick = stop
```

## Page weight

| compression            |    size |
| :--------------------- | ------: |
| string-typer.js        | 4.28 kB |
| string-typer.min.js    | 2.56 kB |
| string-typer.min.js.gz | 1.05 kB |


## License

[MIT](http://opensource.org/licenses/MIT)
