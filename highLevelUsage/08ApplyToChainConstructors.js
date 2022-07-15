// 代码来源于https://github.com/JChehe/blog/issues/35#issue-379761527
function Person(name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

var objectFactory = function () {
  var obj = new Object() // 从 Object.prototype 上克隆一个空的对象
  var Constructor = [].shift.call(arguments) // 取得外部传入的构造器，此例是 Person
  obj.__proto__ = Constructor.prototype // 指向正确的原型 Person.prototype 而不是原来的 Object.prototype
  // NOTE: Constructor.apply(obj, arguments)为精髓
  // 将this指定为obj，然后执行Person函数
  // 即obj.name = name
  var ret = Constructor.apply(obj, arguments) // 借用外部传入的构造器给 obj 设置属性

  return typeof ret === 'object' ? ret : obj // 确保构造器总是会返回一个对象
}

var a = objectFactory(Person, 'sven')

console.log(a.name) // sven
console.log(a.getName()) // sven
console.log(Object.getPrototypeOf(a) === Person.prototype) // true