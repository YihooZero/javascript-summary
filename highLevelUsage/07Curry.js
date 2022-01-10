// 函数柯里化
// 实现1 https://zh.javascript.info/currying-partials
function sum(a, b, c) {
  return a + b + c
}

function curry1(fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

const curriedSum1 = curry1(sum);

console.log(curriedSum1(1,2,3))
console.log(curriedSum1(1)(2,3))
console.log(curriedSum1(1,2)(3))
console.log(curriedSum1(1)(2)(3))

// 实现2 https://github.com/yygmind/blog/issues/37
function curry2(fn, length) {
  length = length || fn.length
  return function (...args) {
    return args.length >= length
      ? fn.apply(this, args)
      : curry2(fn.bind(this, ...args), length - args.length)
  }
}

const curriedSum2 = curry2(sum)

console.log(curriedSum2(1,2,3))
console.log(curriedSum2(1)(2,3))
console.log(curriedSum2(1,2)(3))
console.log(curriedSum2(1)(2)(3))

// 实现3 为实现1的极简写法
const curry3 = fn =>
  judge = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg)
