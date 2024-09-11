Function.prototype.before = function(beforeFn) {
  const _this = this
  return function() {
    beforeFn.apply(this, arguments)
    return _this.apply(this, arguments)
  }
}

Function.prototype.after = function(afterFn) {
  const _this = this
  return function() {
    const ret = _this.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

const fn = function (p1, p2) {
  console.log('sum:', p1 + p2)
  return p1 + p2
}

const decoratorFn = fn.before(function (b1, b2) {
  console.log('before:', b2 - b1)
  return b2 - b1
}).after(function (a1, a2) {
  console.log('after:', a1 * a2)
  return a1 * a2
})

console.log(decoratorFn(2,4))