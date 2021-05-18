// 现象：在 apply 方法前使用 new 会报错
function Something(){
  // init stuff
}
function createSomething(){
  return new Something.apply(null, arguments);
}
var s = createSomething(a,b,c); // 's' is an instance of Something

// 解决办法一
function newCall1(Cls) {
  return new (Function.prototype.bind.apply(Cls, arguments));
  // or even
  // return new (Cls.bind.apply(Cls, arguments));
  // if you know that Cls.bind has not been overwritten
}


// 解决办法二
var createSomething2 = (function() {
  function F(args) {
    return Something.apply(this, args);
  }
  F.prototype = Something.prototype;

  return function(args) {
    return new F(args);
  }
})();

// https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
