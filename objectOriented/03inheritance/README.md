#### 继承

1. [原型链](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/01PrototypeChaining.js)

​		原型链基本概念：利用原型让一个引用类型继承另一个引用类型的属性和方法。

​		具体实现：让原型等于另一个类型的实例，此时原型对象将包含一个指向另一个原型的指针

- **别忘记默认的原型**

​		所有引用类型默认都继承了 `Object`，也是通过原型链实现的。所有函数的默认原型都是 `Object` 的实例，因此默认原型都会包含一		个内部指针，指向 `Object.prototype`。

-  **确定原型和实例的关系**

​		