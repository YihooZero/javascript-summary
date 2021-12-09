// 原型式继承
// demo1
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);       //"Shelby,Court,Van,Rob,Barbie"

// demo2
var person2 = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson2 = Object.create(person2);
anotherPerson2.name = "Greg";
anotherPerson2.friends.push("Rob");

var yetAnotherPerson2 = Object.create(person2);
yetAnotherPerson2.name = "Linda";
yetAnotherPerson2.friends.push("Barbie");
alert(person2.friends); //"Shelby,Court,Van,Rob,Barbie"