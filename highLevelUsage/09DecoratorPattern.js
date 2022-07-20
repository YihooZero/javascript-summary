Function.prototype.before = function(beforeFn) {
  const _this = this
  return function() {
    beforeFn(this, arguments)
    _this.apply(this, arguments)
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

let func = function() {
  console.log(2)
}

func = func.before(function() {
  console.log(1)
}).after(function() {
  console.log(3)
})

func()