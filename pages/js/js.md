### 基本数据类型

基本类型

**六种基本数据类型**

- string
- number
- boolean
- null
- undefined
- symbol

### 引用类型

在javascript中，除了基本数据类型，其他的都是引用类型，引用类型在栈中存储的是指向堆中内容的内存地址，而原始类型在栈中储存的是值

```javascript
var arr=[]
var b=arr
arr.push(1);
console.log(b);//[1]
```

因为它们在内存中使用的是同一个地址

### 类型转换

javascript中，类型转换只有三种

1. 转换成数字

2. 转换成布尔值

3. 转换成字符串

   ##### 经典面试题

   ```javascript
   console.log([]==![]);//true
   ```

**代码分析**：

1. 左侧是一个对象(数组)

2. 右侧是一个布尔值，对象`[]`转换成布尔值`true`，因为除了`null`所有对象都转换成布尔值，所以`![]`结果为`false`

3. 此时相当于`对象==布尔值`，依据类型转换规则，转换成数字类型进行比较

4. 对象(空数组)转换成`0`，布尔值`false`转换成`0`

5. 即`0==0`，返回`true`

   

类型转换规则，如下图：

![类型转换](./public/type.png)

### NaN是什么和用typeof会输出什么

NaN：Not a Number;表示非数字

Typeof NaN === 'number'



### 数字价格千分位分割

将123456789变成123,456,789

```
'123456789'.replace(/(?!^)(?=(\d{3})+$)/g, ',') // 123,456,789
```



### 什么是闭包

闭包是指有权访问另一个函数作用域中的变量的函数



##### 词法作用域对执行环境的保护

javascript的作用域有两部分组成即词法作用域和动态作用域

词法作用域是静态的：

```javascript
var x=1;
function a(){
  var y=1
  function b(){
   var z=2;
   console.log(x,y,z)
  }
}
//在a或者全局作用下都无法访问

//b无论在何处执行都是可以读取x,y,z
```



当一个函数能够记住并访问它所在的词法作用域的时候，就产生了闭包，即使函数是在词法作用域之外执行



**闭包的几种表现形式**

1. 返回一个函数

   这种形式的闭包在javascript的代码编写中，是非常常见的一种方式。

   ```javascript
   var a=1
   function foo(){
     var a=2;
     
     //这就是闭包
     return function (){
       console.log(a)
     }
   }
   
   var bar = foo();
   // 输出2，而不是1
   bar();
   ```

2. 作为函数参数传递

   无论通过何种手段将内部函数传递到它所在词法作用域之外，它都会持有对原始作用域的引用，无论在何处执行这个函数，都会产生闭包。

   ```javascript
   var a=1
   function foo(){
     var a=2
     function baz(){
       console.log(a)
     }
     bar(baz)
   }
   
   function bar(fn){
     fn();//这就是闭包
   }
   bar();//输出2
   ```

   

3. 回调函数

   定时器、事件监听、ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

   ```javascript
   setTimeout(function tiemHandle(){
     console.log("timer")
   },100)
   
   // 事件监听
   $('#container').click(function(){
     console.log('DOM Listener');
   })
   ```

   

4. 非典型闭包IIFF(立即执行函数表达式)

   IIFF（立即执行函数表达式）并不是一个典型的闭包，但它确实创建了一个闭包。

   ```javascript
   var a=1;
   (function IIFF(){
     console.log(a)
   })()
   ```

   

##### 经典循环和闭包面试题

思考一下代码运行结果是什么，如何改进

```javascript
for(var i=1;i<=5;i++){
 setTimeout(()=>{
  console.log(i)
 },i*1000)
}
```

**代码分析**：

1. for循环创建了5个定时器，并且定时器是在循环结束后才开始执行
2. for循环结束后，用var 定义的变量i此时等于6
3. 依次执行五个定时器，都打印变量i，所以结果是打印5次6

**第一种改进方法：** 利用`IIFE(立即执行函数表达式)`当每次`for`循环时，把此时的`i`变量传递到定时器中

```javascript
for(var i=1;i<=5;i++){
  (function(j){
    setTimeout(()=>{
      console.log(j)
    },i*1000)
  })(i)
}
```

**第二种方法：** setTimeout函数的第三个参数，可以作为定时器回调函数中的形参使用

```javascript
for(var i=1;i<=5;i++){
    setTimeout((i)=>{
      console.log(i)
    },i*1000,i)
}
```

**第三种方法：** 在循环中使用`let`代替`var`

```javascript
for(let i=1;i<=5;i++){
 setTimeout(()=>{
  console.log(i)
 },i*1000)
}
```



### 作用域和作用域链

- #### 作用域

  即变量和函数生效的区域或集合

  ```js
  function fn() {
      let str = "函数内部变量";
  }
  fn();
  console.log(str); // Uncaught ReferenceError: str is not defined
  ```

  函数`fn`内部创建一个`str`变量，当我们在全局访问这个变量的时候，系统会报错

  这就说明我们在全局是无法获取到（闭包除外）函数内部的变量

  ##### 作用域一般分三层：

  - **全局作用域**

    任何不在函数中或者大括号中声明的变量都是全局作用域，全局作用域下声明的变量可以在程序的任意位置访问

    ```js
    let a=1;
    function foo(){
      console.log(a)
    }
    foo();//1
    ```

    

  - **函数作用域**

    函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问

    ```js
    function foo(){
      let count = 0
      console.log(count)
    }
    foo()
    console.log(count);//报错 为定义
    ```

    

  - **块级作用域**

    ES6引入`let` 和`const`  关键字和`var `关键字不同，在大括号中使用`let` 和`const` 声明的变量存在于块级作用域中，在大括号之外不能访问这些变量。

    ```js
    {
     let count=0;
    }
    
    console.log(count);//报错
    ```



- #### 作用域链

  当在javascript中使用一个变量时，首先javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推，最后到全局作用域上寻找。

  



### 原型和原型链

- #### 原型

  `javascript` 常被描述为一种基于原型的语言——每个对象拥有一个原型对象。

  当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

  

  函数可以有属性。每个函数都有一个特殊的属性叫作原型`prototype` 。

  ```js
  function foo(){}
  console.log(foo.prototype)
  //输出
  {
      constructor: ƒ foo(),
      __proto__:Object()
  }
  
  ```

- 原型链

  原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链，它解析了为何一个对象会拥有定义在其他对象中的属性和方法。

  

  在对象实例和它的构造函数之间建立一个链接（它是`__proto__` 属性，是从构造函数的`prototype`  属性派生的）



### 去重

- #### 双层循环

```js
var arr=[1,1,'1','1']
function unique(array){
  var res=[]
  for(var i = 0, arrayLen = array.length; i < arrayLen; i++){
    for(var j=0;j<res.length;j++){
      if(array[i]=== res[j]){
        break;
      }
    }
    if(j===res.length){
      res.push(array[i])  
     }
  }
  return res
}
```

### 数组扁平化

尽量多说几种方式

```js
let arr=[[1,2,3,4],[23,24,25,26]]
```

- ES6提供的函数：flat

  ```js
  let newArr=arr.flat(Infinity);//参数为整数或Infinity，代表展开多少层
  ```

- 递归遍历

  ```js
  function flatten(array){
    let res=[];
    for(const item of array){
      if(Array.isArray(item)){
        res=res.concat(flatten(item))
      }else{
        res.push(item)
      }
    }
    return res
  }
  flatten(arr)
  ```

- 使用reduce递归

  ```js
  function flatten(array){
    return array.reduce((pre,current,currentIndex,array)=>{
      if(Array.isArray(current)){
        return pre.concat(flatten(current))
      }else{
        return pre.concat(current)
      }
    },[])
  }
  console.log(flatten(arr))
  ```

- while循环find与扩展运算符

  ```js
  function flatten(array){
    while(array.find((item)=>Array.isArray(item))){
      array=[].concat(...array)
    }
    return array
  }
  console.log(flatten(arr))
  ```

- 数组强制类型转换

  这个只限于基础类型

  ```js
  function flatten(array){
   
    return array.toString().split(',').map(item=>Number(item))
  }
  console.log(flatten(arr))
  ```

- 使用JSON的函数和正则表达

  ```js
  function flatten(array){
    let res=JSON.stringify(array)
    res=res.replace(/(\[|\])/g,'');
    res='['+res+']'
    return JSON.parse(res)
  }
  console.log(flatten(arr))
  ```

- 使用栈和扩展运算符

  ```js
  function flatten(array){
   let res=[]
   let stack=[].concat(array)
   while(stack.length>0){
     const item = stack.pop();//出栈
     if(Array.isArray(item)){
       stack.push(...item)
     }else{
       item !== undefined && res.unshift(item)
     }
   }
   return res
  }
  console.log(flatten(arr));
  ```



### var、let和const的区别

1. var声明的变量会提升到作用域顶部，而let和const不会进行提升
2. var声明的全局变量会挂载到window对象上，而let和const不会
3. var可以重复声明同一个变量，而let和const不可以
4. var声明的变量作用域范围是函数作用域，而let和const声明的变量作用域范围时块级作用域
5. const 声明的常量，一旦声明则不能再次赋值,再次赋值会报错（更改对象属性不会，因为对象地址没有变）



### 展开和收缩符

ES6新增加的运算符`...`，称为展开或者收缩，具体作用取决于到底如何使用。

```javascript
//...展开
function foo(x,y,z){
  console.log(x,y,z);//输出1，2，3
}
var arr=[1,2,3]
foo(...arr)


//收缩
function bar(...arr){
  console.log(arr);//[1,2,3,4,5]
}

bar(1,2,3,4,5)
```



### 解构赋值

常用的解构赋值有以下两种情况

1. 对象的解构

   ```js
   function bar() {
     return {
       X: 4,
       Y: 5,
       Z: 6
     }
   }
   const {x,y,z} =bar()
   ```

   

2. 数组的解构

   ```js
   function foo() {
     return [1,2,3];
   }
   const [a,b,c] = foo()
   ```

   

###  模版字符串

  ` ${内容} `：模版字符串里的内容可以是变量、函数调用或者表达式

```js
const name="张三"
const str=`我叫${name}`
```

### 箭头函数



### eventLoop事件循环

​    注意：

​         javascript是单线程执行的，在javascript运行期间，有可能会阻塞UI渲染，     这在一方面说明javascript引擎线程和UI渲染线程是互斥的。javascript被设计成单线程的原因在于javascript可以修改DOM，如果在javascript工作期间，ui还在渲染的话，则可能不会正确渲染DOM。单线程也有一些好处:

1. 节省内存空间

2. 节省上下文切换时间

3. 没有锁的问题存在

   

##### 进程和线程：

​      **进程：** CPU在运行指令及加载和保存上下文所需要的时间，放在应用上一个程序就是一个进程，一个浏览器tab选项就是一个进程。

​      **线程：** 线程是进程中更小的单位，描述了执行一段指令所需要的时间。



##### 执行栈：

​    可以把执行栈看成是一个函数存储调用的栈结构，遵循先进后出的原则，一个执行栈可能表现如下：

![栈](./public/task.gif)

#####   eventLoop:

​      上面讲到函数会在执行栈中执行，那么当遇到异步代码后，改如何处理？ 其实当遇到异步代码的时候，会被挂起在Task队列中，一旦执行栈为空，就会从Task中拿出需要执行的代码执行，所以本质上讲js中的异步还是同步行为。



![eventLoop](./public/eventLoop.png)

如上图,可以看到，不同的异步任务是有区别的，异步任务又可以划分如下：

1. 宏任务（script、setTimeout、setInterval、setImmidiate、I/O、UI Rendering）可以有多个队列
2. 微任务（procress.nextTick、Promise.then、Object.observe、MutationObserver）只能有一个队列

**执行顺序：**  当执行栈执行完毕后，会首先执行微任务队列，当微任务队列执行完毕再从宏任务中读取并执行，当再次遇到微任务时，放入微任务队列。



### 前端监控

#### 页面埋点

一般会监控以下数据：

1. PV / UV
2. 停留时间
3. 流量来源
4. 用户交互

#### 性能监控

使用浏览器自带的Performance API来实现：MDN[直达](https://developer.mozilla.org/zh-CN/docs/Web/API/performance_property)

你可以尝试在浏览器控制台执行

```js
window.performance
```

#### 异常监控

对于代码的运行错误，通常使用window.onerror拦截报错，但是对于跨域的代码运行会显示script error. 对于这种情况需要给script 标签添加 crossorigin属性

对于某些浏览器可能不会显示堆栈信息，这种情况通过arguments.callee.caller来做栈递归

对于异步代码可以使用catch捕获错误，





