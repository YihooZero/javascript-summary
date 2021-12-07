#### 创建对象

1. [工厂模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/01factoryPattern.js)

   优点：解决了创建多个相似对象的问题

   缺点：没有解决对象的识别问题(怎样知道一个对象的类型)

2. [构造函数模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/02constructorPattern.js)

   **构造函数模式 `vs` 工厂模式**

   - 没有显示地创建对象
   - 直接将属性和方法赋给了`this`对象
   - 没有 `return` 语句

   ------

   **以 `new` 方式调用构造函数会经历以下步骤**

   1. 创建（构造）一个新对象
   2. 这个新对象会被执行`[[prototype]]`连接
   3. 将构造函数的作用域赋给新对象（`this`就指向了这个新对象）
   4. 执行构造函数中的代码（为这个新对象添加属性）
   5. 如果函数没有返回其他**对象**，那么`new`表达式中的函数调用会自动返回这个新对象

   ------

   **构造函数的问题**

   每个方法都要在每个实例上重新创建一遍

   ```javascript
   function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    // this.sayName = function() {
    //   alert(this.name)
    //	}
    this.sayName = new Function("alert(this.name)"); //与声明函数在逻辑上是等价的 
   }
   var person1 = new Person('Nicholas', 29, 'Software Engineer');
   var person2 = new Person('Greg', 27, 'Doctor');
   ```

   > `person1`和`person2`都有一个名为`sayName()`的方法，但这两个方法不是同一个`Function`的实例。每个`Person`实例都包含一个不同的`Function`实例。以这种方式创建函数，不同实例上的同名函数是不相等的

   ```javascript
   console.log(person1.sayName === person2.sayName); // false
   ```

3. [原型模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/03prototypePattern.js)

   优点：让所有对象实例共享它所包含的属性和方法

   - 理解原型对象

     ​		当调用构造函数创建一个新实例后，该实例的内部将包含一个指针(内部属性)，指向构造函数的原型对象，**指针连接存在于实例与构造函数的原型对象之间**，而不是存在于实例与构造函数之间。

     ```javascript
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
     ```

     1. `isPrototypeOf()` 方法用于测试一个对象是否存在于另一个对象的原型链上

        ```javascript
        console.log(Person.prototype.isPrototypeOf(person1)) // true
        console.log(Person.prototype.isPrototypeOf(person2)) // true
        ```

     2. `Object.getPrototypeOf()` 方法返回`[[prototype]]`的值

        ```javascript
        console.log(Object.getPrototypeOf(person1) === Person.prototype) // true
        console.log(Object.getPrototypeOf(person1).name) // 'Nicholas'
        ```

     3. `hasOwnProperty()`方法可以检测一个属性是存在于实例中，还是存在于原型中，只在给定属性存在于对象实例中时，才会返回 `true`

        ```javascript
        console.log(person1.hasOwnProperty("name")) // false
        person1.name = 'Greg';
        console.log(person1.name)                   // 'Greg'--来自于实例
        console.log(person1.hasOwnProperty("name")) // true
        
        console.log(person2.name)                   // 'Nicholas'--来自于原型
        console.log(person2.hasOwnProperty("name")) // false
        
        delete person1.name;
        console.log(person1.name)                   // 'Nicholas'--来自于原型
        console.log(person1.hasOwnProperty("name")) // false
        ```

     4. 当为对象实例添加一个属性时，这个属性就会**屏蔽**原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性 

   - 原型与`in`操作符

     1. 单独使用时，`in`操作符会在通过对象能够访问给定属性时返回 `true`，无论该属性存在于实例中还是原型中
     
     2. `hasOwnProperty()`方法和`in`同时使用，可以确定属性是存在于对象中还是原型中
     
        ```javascript
        function hasPrototypeProperty(object, name){
        	return !object.hasOwnProperty(name) && (name in object);
        }
        ```
     
   - 原型对象的问题
   
     1. 省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值  
   
     2. 原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去，毕竟（如前面的例子所示），通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了
   
        ```javascript
        function Person(){}
        
        Person.prototype = {
        	constructor: Person,
        	name : "Nicholas",
        	age : 29,
        	job : "Software Engineer",
        	friends : ["Shelby", "Court"],
        	sayName : function () {
        		alert(this.name);
        	}
        };
        
        var person1 = new Person();
        var person2 = new Person();
        
        person1.friends.push("Van");
        
        alert(person1.friends); 					// "Shelby,Court,Van"
        alert(person2.friends); 					// "Shelby,Court,Van"
        alert(person1.friends === person2.friends); // true
        ```
   
4. [组合使用构造函数模式和原型模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/04CombinationConstructorPrototypePattern.js)

   **该组合是最常用的模式，构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性**

5. [动态原型模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/05DynamicPrototypePattern.js)

   把所有信息封装在构造函数中，通过在构造函数中初始化原型，又保持了同时使用构造函数和原型的优点。通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型

   > 使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系    

6. [寄生构造函数模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/06ParasiticConstructorPattern.js)

   基本思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象，适用于前面几种模式都不适用的情况下

   > 返回的对象与构造函数或者与构造函数的原型属性之间没有关系  

7. [稳妥构造函数模式](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/02objectCreation/07DurableConstructorPattern.js)

   稳妥对象指的是没有公共属性，方法不引用`this`对象

   > 稳妥构造函数模式与寄生构造函数类似，有两点不同
   >
   > 1、新创建对象的实例方法不引用`this`
   >
   > 2、不适用`new`操作符调用构造函数