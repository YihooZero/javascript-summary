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

4. [原型式继承](https://github.com/YihooZero/javascript-summary/blob/main/objectOriented/03inheritance/04PrototypalInheritance.js)

   基本思想：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型