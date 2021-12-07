// 寄生构造函数模式
function Person(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this.name);
  };
  return o;
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas

// 特殊情况下为对象创建构造函数
// 创建一个具有额外方法的特殊数组，不能直接修改Array构造函数，可以使用寄生构造函数模式
function SpecialArray() {
  // 创建数组
  var values = new Array();

  // 添加值
  values.push.apply(values, arguments);

  // 添加方法
  values.toPipedString = function () {
    return this.join('|');
  };

  // 返回数组
  return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"
