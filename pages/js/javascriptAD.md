## 手写getQueryString

给定一段URL和参数的名称，获取此参数的值

```js
var url = 'https://www.baidu.com/s?id=123&name=zhangsan&phone=11012018011';
var obj={};//取全部参数
function getQueryString(name){
  var str=""
  var index=url.indexOf("?")
  if(index === -1){
    return undefined
  }
  str=url.substring(index+1).split("&");
  for(let i=0;i<str.length;i++){
    var splitItem=str[i].split('=')
    if(splitItem[0] === name){
      return splitItem[1]
    }
    
    //如果要去全部参数,可以返回一个对象 注释上方if条件
    obj[splitItem[0]]=splitItem[1];//{id: '123', name: 'zhang san', phone: '11012018011'}
  }
}

getQueryString("name");//zhangsan
```



## 手写实现setInterval

使用requestAnimatianFrame实现

```js
const myObj={
  timer:null,
  setInterval:function (callback,interval){
    const now=Date.now//时间戳函数
    let startTime=now()//当前时间戳
    let endTime=startTime//结束的
    const self=this//保存上下文
    const loop=function (){
      self.timer=requestAnimationFrame(loop)//
      endTime=now()
      if(endTime-startTime >= interval){
        startTime=endTime=now()
        callback&&callback()
      }
    }
    this.timer=requestAnimationFrame(loop)//
    return this.timer
  },
  clearInterval:function (){
    cancelAnimationFrame(this.timer)
  }
}


let count=0
const timer=myObj.setInterval(()=>{
  console.log("interval...")
  count++
  if(count>=5){
    myObj.clearInterval()
  }
},1000)
```

## 防抖

> 防抖：函数防抖的核心思路是利用setTimeout延迟执行某个方法，只有在指定的时间后才执行，中间触发的事件不执行。最常见的防抖函数就是，搜索框只有用户在输入完毕后才去服务器执行查询

```js
function debounce(fn,delay){
  let timer=null;
  return function (){
    let ctx=this
    if(timer){
      clearTiemout(timer)
    }
    timer=setTimeout(()=>{
      fn.call(ctx,....arguments)
    },delay||300)
  }
}

window.onresize=debounce(function (){
  console.log(1)
},500)
```



## 节流

> 节流：将原本1秒可能执行10次的函数，节流成1秒执行2-3次，有许多函数需要节流，例如：
>
> 1. Window.onsize事件
> 2. mouseover事件
> 3. scroll事件
> 4. 其他事件

```js
function throttle(fn,interval=500){
  let timer=null
  let firstTime=true
  return function (){
    const args=arguments
    const self=this
    if(firstTime){
      fn.apply(self,args)
      firstTime=false
      return false
    }
    if(timer){
      return false
    }
    timer=setTimeout(()=>{
      clearTimeout(timer)
      timer=null
      fn.apply(self,args)
    },interval)
  }
}
```




## 原型如何实现继承

```js
function Parent(value){
  this.val=value
}

Parent.prototype.getValue=function(){
 console.log(this.val)
}

function Child(value){
  Parent.call(this,value)
}
Child.prototype=new Parent()

const child=new Child(1)

child.getValue();//1
child instanceif Parent //true
```

## class如何实现继承

```js
class Parent {
   constructor(value) {
     this.val = value
   }
   getValue() {
     console.log(this.val)
   } 
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

## 手写call

```js
Function.prototype.myCall=function(ctx){
  if(typeof this !== 'function'){
    throw new TypeError('Error')
  }
  ctx=ctx||window
  ctx.fn=this
  const args=[...arguments].slice(1)
  const res=ctx.fn(...args)
  delete ctx.fn
  return res
}
```

## 手写apply

```js
Function.prototype.myApply=function(ctx){
 if(typeof this !== 'function'){
   throw new TypeError('Error')
 }
 ctx=ctx||window
 ctx.fn=this
 let res;
  if(arguments[1]){
    res=ctx.fn(...arguments[1])
  }else{
    res=ctx.fn()
  }
  delete ctx.fn
  return res
}
```

## 手写bind

```js
Function.prototype.myBind=function(ctx){
 if(typeof this !== 'function'){
   throw new TypeError('Error')
 }
  const _this=this
  const args=[...arguments].slice(1)
  return function F(){
    if(this instanceof F){
      return new _this(...args,...arguments)
    }
    return _this.apply(ctx,args.concat(...arguments))
  }
}
```



## 手写实现ajax

```js
function ajax({url="",header={},method="GET",dataType="JSON",async=true,data,params}){
  return new Promise((resolve,reject)=>{
    let xhr=new XMLHttpRequest()
    xhr.setRequestHeader(header)
    if(params){
      let paramsArr=[]
      for(let key in data){
        paramsArr.push(`${key}=${data[key]}`)
      }
      url+=`?${paramsArr.join("&")}`
    }
     xhr.open(method,url,async)
    if(data){
      let formData=new FormData()
      for(let key in data){
        formData.append('key',data[key])
      }
      xhr.send(formData)
    }
    if(!params && !data){
      xhr.send()
    }
    xhr.responseType=dataType
    xhr.onreadystatechange=()=>{
      if(xhr.readyState === 4&&xhr.status==200) {
        let result = xhr.responseText
        resolve(result)
      }
    }
    xhr.onerror=(err)=>{
      reject(err)
    }
  })
}
```

## 柯里化

> 在数学和计算机科学中，柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

> 柯里化（Currying）是一种对于函数的高阶转换，它指的是将一个函数从可调用的 `fn(a, b, c)` 转换成可连续调用的 `fn(a)(b)(c)`

通用柯里化

```js
function curry(fn){
  let args=[]
  return function (){
    if(arguments.length===0){
      return fn.apply(this,args)
    }else{
      Array.prototype.push.apply(args,arguments)
      return arguments.callee
    }
  }
}

let cost=(function (){
  let money=0;
  return function (){
    for(let i = 0,len=arguments.length;i<len;i++){
      money+=arguments[i]
    }
    return money
  }
})()

cost=curry(cost)
cost(100)
cost(200)
cost(1)

let money=cost()
console.log(money);//301
```



## 前端监控

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
