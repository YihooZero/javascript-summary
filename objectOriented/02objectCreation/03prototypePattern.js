// 原型模式
// demo1-->原型图imgs/objectOriented-02-03-1.png
function Person() {

}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
  console.log(this.name);
};

var person1 = new Person();
person1.sayName(); //"Nicholas"

var person2 = new Person();
person2.sayName(); //"Nicholas"

console.log(person1.sayName === person2.sayName) // true

// isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上
console.log(Person.prototype.isPrototypeOf(person1)) // true
console.log(Person.prototype.isPrototypeOf(person2)) // true
// Object.getPrototypeOf() 方法返回[[prototype]]的值
console.log(Object.getPrototypeOf(person1) === Person.prototype) // true
console.log(Object.getPrototypeOf(person1).name) // 'Nicholas'

// demo2-->原型图imgs/objectOriented-02-03-2.png
function Person2() {}
var friend = new Person2();
// 特别注意构造函数的调用时机，若new Person2()在重写原型之后调用则没有此问题

Person2.prototype = {
  constructor: Person2,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName: function () {
    console.log(this.name)
  }
}
friend.sayName() // error
