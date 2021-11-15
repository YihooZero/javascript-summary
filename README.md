# javascript-summary
#### 1.方法

- [数组去重](https://github.com/YihooZero/javascript-summary/blob/main/methods/01ArrayDeduplication.js)
- [排序算法](https://github.com/YihooZero/javascript-summary/blob/main/methods/02SortingAlgorithms.js)

#### 2.技巧

#### 3.高阶用法

- [`apply()` 与 `new` 运算符配合使用](https://github.com/YihooZero/javascript-summary/blob/main/hightLevelUsage/01applyWithNew.js)

#### 4.模拟实现

- ​	[Promise.finally](https://github.com/YihooZero/javascript-summary/blob/main/polyfill/PromiseFinally.js)

#### 5.面向对象

- 理解对象

- 创建对象

  1. [工厂模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/01factoryPattern.js)

     优点：解决了创建多个相似对象的问题

     缺点：没有解决对象的识别问题(怎样知道一个对象的类型)
     
  2. [构造函数模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/02constructorPattern.js)
  
     构造函数模式 `vs` 工厂模式
  
     - 没有显示地创建对象
     - 直接将属性和方法赋给了`this`对象
     - 没有 `return` 语句
  
     ------
  
     以 `new` 方式调用构造函数会经历以下步骤
  
     1. 创建（构造）一个新对象
     2. 这个新对象会被执行`[[prototype]]`连接
     3. 将构造函数的作用域赋给新对象（`this`就指向了这个新对象）
     4. 执行构造函数中的代码（为这个新对象添加属性）
     5. 如果函数没有返回其他**对象**，那么`new`表达式中的函数调用会自动返回这个新对象

