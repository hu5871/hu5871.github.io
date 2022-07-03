**你写的代码可能就是一个或多个设计模式，只是你没注意到优秀的开拓者是如何称呼这种代码思维的**

****

学习设计模式能更大限度的优化代码，以及对已有代码的合理重构，也是开发高质量、高维护性，可扩展性代码的重要手段。

### 单例模式

**概念：**单例模式（Singleton）属于创建型的设计模式，它限制我们只能创建单一对象或者某个类的单一实例。单例模式保证一个类只有一个实例，一般先判断实例是否存在，如果存在直接返回，不存在则先创建再返回，这样就可以保证一个类只有一个实例对象。

**作用：**

- 模块间通信
- 保证某个类的对象唯一性
- 防止变量污染

**注意事项**

- 正确使用this
- 闭包容易造成内存泄漏，所以要及时清除不需要的变量
- 创建一个新对象的成本较高

**案例**

单例模式广泛应用于不同程序语言中, 在实际软件应用中应用比较多的比如电脑的任务管理器,回收站, 网站的计数器, 多线程的线程池的设计等.

**代码**

```js
class User {
    constructor () {
        if (!User._falg) {
            User._falg = this;
        }
        return User._falg;
    }
}
const user1=new User()
const user2=new User()
console.log(user1 === user2);//true
```



### 构造器模式

**概念：**构造器模式用于创建特定类型的对象，以便实现业务逻辑和功能的可复用。

**作用**

- 创建特定类型的对象
- 逻辑和业务的封装

**注意事项**

- 注意划分好业务逻辑的边界
- 配合单例实现初始化等工作
- 构造函数命名规范，首字母大写
- new对象的成本，被公用方法放到原型链上

**实际案例**

构造器模式我觉得是代码的格局,也是用来考验程序员对业务代码的理解程度.它往往用于实现javascript的工具库,比如lodash等以及javascript框架.

**代码**

```js
function Tools(){
  if(!(this instanceof Tools)){
    return new Tools()
  }
  this.name = 'js工具库'
  // 获取dom的方法
  this.getEl = function(elem) {
    return document.querySelector(elem)
  }
  // 判断是否是数组
  this.isArray = function(arr) {
    return Array.isArray(arr)
  }
  // 其他通用方法...
}
```



### 建造者模式

**概念**：建造者模式将一个复杂的逻辑或者功能通过有条理的分工来一步步实现。

**作用**

- 分别创建一个复杂的对象或者实现一个复杂的功能
- 解耦封装过程，无需关注具体创建的细节

**注意事项**

- 需要有可靠的算法和逻辑支持
- 按需暴露一定接口

**实际案例**

建造者模式其实在很多领域也有应用,很多js插件,大部分都采用了建造者模式。

**代码**

```js

// canvas绘制图形验证码
(function(){
    function Gcode(el, option) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.option = option;
        this.init();
    }
    Gcode.prototype = {
        constructor: Gcode,
        init: function() {
            if(this.el.getContext) {
                isSupportCanvas = true;
                var ctx = this.el.getContext('2d'),
                // 设置画布宽高
                cw = this.el.width = this.option.width || 200,
                ch = this.el.height = this.option.height || 40,
                textLen = this.option.textLen || 4,
                lineNum = this.option.lineNum || 4;
                var text = this.randomText(textLen);
    
                this.onClick(ctx, textLen, lineNum, cw, ch);
                this.drawLine(ctx, lineNum, cw, ch);
                this.drawText(ctx, text, ch);
            }
        },
        onClick: function(ctx, textLen, lineNum, cw, ch) {
            var _ = this;
            this.el.addEventListener('click', function(){
                text = _.randomText(textLen);
                _.drawLine(ctx, lineNum, cw, ch);
                _.drawText(ctx, text, ch);
            }, false)
        },
        // 画干扰线
        drawLine: function(ctx, lineNum, maxW, maxH) {
            ctx.clearRect(0, 0, maxW, maxH);
            for(var i=0; i < lineNum; i++) {
                var dx1 = Math.random()* maxW,
                    dy1 = Math.random()* maxH,
                    dx2 = Math.random()* maxW,
                    dy2 = Math.random()* maxH;
                ctx.strokeStyle = 'rgb(' + 255*Math.random() + ',' + 255*Math.random() + ',' + 255*Math.random() + ')';
                ctx.beginPath();
                ctx.moveTo(dx1, dy1);
                ctx.lineTo(dx2, dy2);
                ctx.stroke();
            }
        },
        // 画文字
        drawText: function(ctx, text, maxH) {
            var len = text.length;
            for(var i=0; i < len; i++) {
                var dx = 30 * Math.random() + 30* i,
                    dy = Math.random()* 5 + maxH/2;
                ctx.fillStyle = 'rgb(' + 255*Math.random() + ',' + 255*Math.random() + ',' + 255*Math.random() + ')';
                ctx.font = '30px Helvetica';
                ctx.textBaseline = 'middle';
                ctx.fillText(text[i], dx, dy);
            }
        },
        // 生成指定个数的随机文字
        randomText: function(len) {
            var source = ['a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j', 
            'k', 'l', 'm', 'o', 'p',
            'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z'];
            var result = [];
            var sourceLen = source.length;
            for(var i=0; i< len; i++) {
                var text = this.generateUniqueText(source, result, sourceLen);
                result.push(text)
            }
            return result.join('')
        },
        // 生成唯一文字
        generateUniqueText: function(source, hasList, limit) {
            var text = source[Math.floor(Math.random()*limit)];
            if(hasList.indexOf(text) > -1) {
                return this.generateUniqueText(source, hasList, limit)
            }else {
                return text
            }  
        }
    }
    new Gcode('#canvas_code', {
        lineNum: 6
    })
})();
```



### 代理模式

**概念：** 一个对象通过某种代理方式来控制对另一对象的访问。

**作用**

- 远程代理（一个对象对另一个对象的局部代理）
- 虚拟代理（对于需要创建开销很大的对象如渲染网页大图时可以先用缩略图代替真图）
- 安全代理（保护真实对象的访问权限）
- 缓存代理（一些开销比较大的运算提供在暂时的存储，下次运算时，如果传递进来的参数跟之前相同，则直接返回前面存储的运算结果）

**注意事项**

使用代理会增加代码的复杂度,所以应该有选择的使用代理.

**实际案例**

我们可以使用代理模式实现如下功能:

- 通过缓存代理来优化计算性能
- 图片占位符/骨架屏/预加载等
- 合并请求/资源

**代码**

计算缓存器

```js
function sum(a,b){
 return a+b
}

function proxyFun(fn) {
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    cache[args] = fn.apply(this, arguments);
    return cache[args];
  };
}
let p=proxyAdd(sum)
p(1,2);//3
p(1,2);//从缓存中取3

```





### 外观模式

**概念：** 外观模式（facade）为子系统中的一组接口提供一个一致的表现，使得子系统更容易使用而不需要关心内部复杂而繁琐的细节。

**作用**

- 对接口和调用者进行了一定的解耦
- 创造经典的三层结构MVC
- 开发阶段减少不同子系统之间的依赖和耦合，方便各个子系统的迭代和扩展
- 为大型复杂系统提供一个清晰的接口

**注意事项**

当外观模式被开发者连续调用时会造成一定的性能消耗，这是由于每次调用都会进行可用性检测

**实际案例**

我们可以使用外观模式来设计兼容不同浏览器的事件绑定的方法以及其他需要统一实现接口的方法或者抽象类.

**代码**

在javascript中最基础的事件绑定就是一个外观模式的实现

```js
function addEventToDOM(dom,type,fn){
   // 对于支持dom2级事件处理程序
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
    }else if(dom.attachEvent){
      // 对于IE9一下的ie浏览器
        dom.attachEvent('on'+type,fn);
    }else{
        dom[on+'type'] = fn ;
    }
}
```

### 观察者模式

**概念：**观察者模式定义了一种一对多的关系，所有观察对象同时监听某一个主题对象，当主题对象状态发生改变时就会通知所有观察者对象，使得它们能够自动更新自己。

**作用**

- 目标对象与观察者存在一种动态关联，增加了灵活性
- 支持简单的广播通信，自动通知所有已经订阅过的对象
- 目标对象和观察者之间的抽象耦合关系能够单独扩展和重用

**注意事项**

观察者模式一般都都要注意先监听，再触发

**实际案例**

观察者模式是非常经典的设计模式，只要应用如下：

- 系统消息通知
- 网站日志记录
- 内容订阅功能
- javascript事件机制
- react和vue等的观察者



**代码**

```js
// 定义一个目标对象
class Subject {
  constructor() {
    this.Observers = [];
  }
  add(observer) {
    //添加
    this.Observers.push(observer);
  }
  remove(observer) {
    //移除
    this.Observers.filter((item) => item === observer);
  }
  notify() {
    //通知所有观察者
    this.Observers.forEach((item) => {
      item.update();
    });
  }
}
//定义观察者对象
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`my name is:${this.name}`);
  }
}

let sub = new Subject();
let obs1 = new Observer("observer11");
let obs2 = new Observer("observer22");
sub.add(obs1);
sub.add(obs2);
sub.notify();
```



### 策略模式

**概念：**策略模式将不同算法进行合理的分类和单独封装，让不同算法之间可以互相替换而不会影响算法的使用者。

**作用**

- 实现不同，作用一致
- 调用方式相同，降低了使用成本以及不同算法之间的耦合
- 单独定义算法模型，方便单元测试
- 避免大量冗余的代码判断，比如if else

**实际案例**

- 实现更优雅的表单验证
- 游戏里的角色计分器
- 棋牌类游戏的输赢算法

**代码**

接下来我们实现一个根据不同类型实现求和算法的模式来带大家理解策略模式.

```js
const obj = {
  A: (num1,num2) => num + num2,
  B: (num1,num2) => num * num2,
  C: (num1,num2) => num - num2,
  D: (num1,num2) => num / num2,
}

const getFun =function(type, num1,num2) {
  return obj[type](num1,num2)
}
```



### 迭代器模式

**概念：**提供一种方法顺序访问一个聚合对象中的各个元素，使用者并不需要关心该方法的内部。

**作用**

- 为遍历不同集合提供统一接口
- 保护原集合但又提供外部访问内部元素的方式

**实际案例**

迭代器模式最常见的案例就是数组的遍历方法如forEach,map等。

**代码**

接下来笔者使用自己封装的一个遍历函数来让大家更加理解迭代器模式的使用,该方法不仅可以遍历数组和字符串,还能遍历对象.lodash里的_.forEach(collection, [iteratee=_.identity])方法也是采用策略模式的典型应用.

```js
function _each(el, fn = (v, k, el) => {}) {
  // 判断数据类型
  function checkType(target){
    return Object.prototype.toString.call(target).slice(8,-1)
  }

  // 数组或者字符串
  if(['Array', 'String'].indexOf(checkType(el)) > -1) {
    for(let i=0, len = el.length; i< len; i++) {
      fn(el[i], i, el)
    }
  }else if(checkType(el) === 'Object') {
    for(let key in el) {
      fn(el[key], key, el)
    }
  }
}
```



### 发布订阅模式

```js
class EventEmitter{
  constructor(){
    this.cache={}
  }
  on(name,fn){
    if(this.cache[name]){
      this.cache[name].push(fn)
    }else{
      this.cache[name]=[fn]
    }
  }
  
  off(name,fn){
    let tasks=this.cache[name]
    if(tasks){
      const index=tasks.findIndex(f=>f===fn || f.callback===fn)
      if(index>=0){
        tasks.splice(index,1)
      }
    }
  }
  
  emit(name,once=false,...args){
    if(this.cache[name]){
      let tasks=this.cache[name].slice()
      for(let fn of tasks){
        fn(...args)
      }
      if(once){
        delete this.cache[name]
      }
    }
  }
}
```

