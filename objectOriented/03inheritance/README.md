#### 继承

1. [原型链](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/01PrototypeChaining.js)

   原型链基本概念：利用原型让一个引用类型继承另一个引用类型的属性和方法。

   具体实现：让原型等于另一个类型的实例，此时原型对象将包含一个指向另一个原型的指针

   - **别忘记默认的原型**

     所有引用类型默认都继承了 `Object`，也是通过原型链实现的。所有函数的默认原型都是 `Object` 的实例，因此默认原型都会包含一个内部指针，指向 `Object.prototype`。

   - **确定原型和实例的关系**

     1. `instanceof` 操作符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

        ```javascript
        alert(instance instanceof Object);    // true
        alert(instance instanceof SuperType); // true
        alert(instance instanceof SubType);   // true
        ```

        > `instance` 是 `Object`、 `SuperType` 或 `SubType` 中任何一个类型的实例  

     2. `isPrototypeOf()` 方法用于测试一个对象是否存在于另一个对象的原型链上。只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型

        ```javascript
        alert(Object.prototype.isPrototypeOf(instance));    // true
        alert(SuperType.prototype.isPrototypeOf(instance)); // true
        alert(SubType.prototype.isPrototypeOf(instance));   // true
        ```

   - **谨慎的定义方法**

     1. 给原型添加方法的代码一定要放在替换原型的语句之后
     
        ```javascript
        function SuperType(){
        	this.property = true;
        }
        SuperType.prototype.getSuperValue = function(){
        	return this.property;
        };
        function SubType(){
        	this.subproperty = false;
        }
        
        //继承了 SuperType
        SubType.prototype = new SuperType();
        //添加新方法
        SubType.prototype.getSubValue = function (){
        	return this.subproperty;
        };
        
        //重写超类型中的方法
        SubType.prototype.getSuperValue = function (){
        	return false;
        };
        
        var instance = new SubType();
        alert(instance.getSuperValue()); //false
        ```
     
     2. 通过原型链实现继承时，不能使用对象字面量创建原型方法，因为这样会重写原型方法
     
        ```javascript
        function SuperType(){
        	this.property = true;
        }
        
        SuperType.prototype.getSuperValue = function(){
        	return this.property;
        };
        
        function SubType(){
        	this.subproperty = false;
        }
        
        //继承了 SuperType
        SubType.prototype = new SuperType();
        
        //使用字面量添加新方法，会导致上一行代码无效
        SubType.prototype = {
        	getSubValue : function (){
        		return this.subproperty;
        	},
        	someOtherMethod : function (){
        		return false;
        	}
        };
        
        var instance = new SubType();
        alert(instance.getSuperValue()); //error!
        ```
     
   - **原型链问题**
   
     1. 包含引用类型值的原型属性会被所有实例共享
   
        ```javascript
        function SuperType(){
        	this.colors = ["red", "blue", "green"];
        }
        
        function SubType(){}
        
        //继承了 SuperType
        SubType.prototype = new SuperType();
        
        var instance1 = new SubType();
        instance1.colors.push("black");
        alert(instance1.colors); //"red,blue,green,black"
        
        var instance2 = new SubType();
        alert(instance2.colors); //"red,blue,green,black"
        ```
   
     2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数
   
2. [借用构造函数](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/02ConstructorStealing.js)

   基本思想：在子类型构造函数内部调用超类型构造函数。通过`apply()`或`call()`方法在新创建的对象上执行构造函数

   - **传递参数**

     ```javascript
     function SuperType(name){
     	this.name = name;
     }
     
     function SubType(){
     	//继承了 SuperType，同时还传递了参数
     	SuperType.call(this, "Nicholas");
     	//实例属性
     	this.age = 29;
     }
     
     var instance = new SubType();
     alert(instance.name); //"Nicholas";
     alert(instance.age); //29
     ```

   - **借用构造函数问题**

     方法都在构造函数中定义，无法函数复用，并且在超类型的原型中定义的方法，对子类型也是不可见的，结果所有的类型都只能使用构造函数模式

3. [组合继承](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/03CombinationInheritance.js)

   基本思想：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。

   组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为 `JavaScript` 中最常用的继承模式。而且， `instanceof` 和 `isPrototypeOf()`也能够用于识别基于组合继承创建的对象。

   不足：不论在什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部

   ```javascript
   function SuperType(name){ 
    this.name = name; 
    this.colors = ["red", "blue", "green"]; 
   } 
   
   SuperType.prototype.sayName = function(){ 
    alert(this.name); 
   }; 
   
   function SubType(name, age){ 
    SuperType.call(this, name);         //第二次调用 SuperType() 
    
    this.age = age; 
   } 
   SubType.prototype = new SuperType(); //第一次调用 SuperType() 
   
   SubType.prototype.constructor = SubType; 
   SubType.prototype.sayAge = function(){ 
    alert(this.age); 
   }; 
   ```

   

4. [原型式继承](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/04PrototypalInheritance.js)

   基本思想：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
   
   `ECMAScript 5` 通过新增 `Object.create()`方法规范化了原型式继承。在传入一个参数的情况下， `Object.create()`与 `object()`方法的行为相同。
   
5. [寄生式继承](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/05ParasiticInheritance.js)

   基本思想：创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象

   不足：使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似。

6. [寄生组合式继承](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/06ParasiticCombinationInheritance.js)

   为了解决组合继承调用两次超类型构造函数

   基本思想：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

   ```javascript
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
   ```

   **寄生组合式继承是引用类型最理想的继承范式**
