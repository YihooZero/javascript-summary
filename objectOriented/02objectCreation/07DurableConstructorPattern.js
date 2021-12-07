// 稳妥构造函数模式
function Person(name, age, job){
  // 创建要返回的对象
  var o = new Object();

  // 定义私有变量和函数

  // 添加方法
  o.sayName = function () {
    console.log(name)
  };

  // 返回对象
  return o;
}

var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"
