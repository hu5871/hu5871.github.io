## 手写getQueryString

给定一段URL和参数的名称，获取此参数的值

```js
var url = 'https://www.baidu.com/s?id=123&name=zhangsan&phone=11012018011';
var obj={};//去全部参数的话
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

