// 构造函数模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

// person1和person2分别保存着Person的一个不同的实例，这两个对象都有一个constructor(构造函数)属性，该属性指向Person
console.log(person1.constructor === Person)  // true
console.log(person2.constructor === Person)  // true
// NOTE: 实例本来没有constructor属性，person1.constructor实际找的是Person.prototype.constructor
// 本质上是 Person.prototype.constructor === Person

// instanceof 检测对象类型，创建的对象（person1和person2）既是Object的实例，也是Person的实例
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
console.log(person2 instanceof Object) // true
console.log(person2 instanceof Person) // true