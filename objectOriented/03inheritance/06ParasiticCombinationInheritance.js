// 寄生组合式继承
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType){
  var prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType;             // 增强对象
  subType.prototype = prototype;               // 指定对象
}

function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  SuperType.call(this, name);

  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
  alert(this.age);
};