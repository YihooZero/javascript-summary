// 原型链
// demo1-->原型图imgs/objectOriented-03-01-01.png
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
}

function SubType() {
  this.subproperty = false;
}
// 继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue());