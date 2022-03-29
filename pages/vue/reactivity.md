## 基本信息

你需要了解基本的核心方法使用方式，这对你接下来的阅读非常有利

## vue3响应式

vue3采用prox来实现响应式解决了什么?

1. 不需要对属性重写添加getter及setter
2. 无法监控新增和删除属性的变化，所以有了$set、$delete
3. 不需要对数组单独处理（重写7中数组方法...）

## reactive

reactive方法会将对象变成proxy对象，effect中使用reactive对象时会进行依赖收集，稍后属性变化时会重新执行effect函数。



 @vue/shared   放置一些公用工具函数



```typescript
//检查是否是数组或者对象
export function isObject(value: unknown): value is Record<any,any>{
  return typeof value ==='object'&& value !==null
}
```





```typescript
import{ isObject }from"@vue/shared"

const enum ReactiveFlags {
  IS_REACTIVE='__v_isReactive'
}

const mutableHandlers: ProxyHandler<object>={
  get(target, key, receiver){
    //当已经被代理过的对象再次传入时，返回已经代理过的对象
    if(key === ReactiveFlags.IS_REACTIVE){// 在get中增加标识，当获取IS_REACTIVE时返回
      return true;
    }
    
  // 等会谁来取值就做依赖收集
  // 写effect补充
    
    const res = Reflect.get(target, key, receiver);
    return res;
  },
  set(target, key, value, receiver){
    
    // 等会赋值的时候可以重新触发effect执行
    //写effect补充
    
    const result = Reflect.set(target, key, value, receiver);
    return result;
  }
}

function createReactiveObject(target: object, isReadonly: boolean){
  if(target[ReactiveFlags.IS_REACTIVE]){// 在创建响应式对象时先进行取值，看是否已经是响应
    return target
  }
  
  //只对常用的数组或者对象做代理
  if(!isObject(target)){
    return target
  }
  const exisitingProxy=reactiveMap.get(target);//如果缓存中有直接使用上一次的代理结果 
  if (exisitingProxy){
   return exisitingProxy
  }
  const proxy=new Proxy(target,mutableHandlers)
  reactiveMap.set(target,proxy)//将原对象和生成的代理对象 做一个映射表
  return proxy
}

const reactiveMap=new WeakMap(); //WeakMap 弱引用  key必须是对象 如果key没有被引用被自动销毁

export function reactive(target: object){
  return createReactiveObject(target,false)
}




```





## effect
```typescript
let effectStack = [];// 当前正在执行的effect
let activeEffect;// 存放effect列表

function clealupEffect(effect) {
  const { deps } = effect
  for (const dep of deps) {
    dep.delete(effect);//移除属性对应的effect
  }
}
export class ReactiveEffect {

  active = true;//激活状态
  deps = [];//让effct记录它依赖了哪些属性，同时要记录当前属性依赖哪个effect
  constructor(public fn, public scheduler?) {

  }

  run() {//执行fn
    if (!this.active) { //非激活状态调用run方法
      return this.fn()
    }

    if (!effectStack.includes(this)) {// 防止effect中修改内容导致重复更新,死循环
      try {
        effectStack.push(activeEffect = this)
        return this.fn();//取值 new Proxy 会执行get方法《依赖收集》
      } finally {
        effectStack.pop();//执行完删除栈中最后一个effect
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  stop() {//让effect和dep取消关联。dep上面的储存的effect移除掉
    if (this.active) {
      clealupEffect(this)
      this.active = false
    }
  }
}

export function isTacking() {//是否需要收集
  return activeEffect !== undefined
}

const targetMap = new WeakMap();

export function track(target, key) {//一个属性对应多个effect，一个effect中依赖了多个属性
  if (!isTacking()) {//属性不依赖于effect直接跳出
    return
  }

  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))//{对象：map{}}
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))//{对象：map{key:set:[]}}  一个属性可能对象多个effect
  }

  trackEffects(dep)
}

export function trackEffects(dep) {
  let shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)//{对象：map{key:set:[effect，effect]}} 
    activeEffect.deps.push(dep)
  }
}


//将属性和对应的effect维护成映射关系，后续属性变化可以触发对应的effect函数重新run
export function trigeer(target, key) {
  let depsMap = targetMap.get(target);// 获取对应的映射表
  if (!depsMap) {
    return
  }
  let deps = []
  if (key !== undefined) {
    deps.push(depsMap.get(key));
  }
  let effects = []
  for (const dep of deps) {
    effects.push(...dep);// 将effect全部存到effects中
  }
  triggerEffects(effects)
}

export function effect(fn) {

  const _effect = new ReactiveEffect(fn)// 创建响应式effect
  _effect.run();// 让响应式effect默认执行
  let runner = _effect.run.bind(_effect) //返回一个run，供用户选择再次执行
  runner._effect = _effect
  return runner
}
export function triggerEffects(dep) {
  for (const effect of dep) {//如果当前effect执行和要执行的effect是同一个，不执行，防止循环
    if (effect !== activeEffect) {
      if (effect.scheduler) {
        return effect.scheduler()
      }
      effect.run()//执行effect
    }
  }
}
```

#### 依赖收集和触发更新

回到reactive

```typescript
const mutableHandlers:ProxyHandler<Record<any,any>>={
  get(target,key,recevier){//recevier代理对象的本身
    if(key ===ReactiveFlags.IS_REACTIVE){
      return true
    }
    //取值时，可以收集它在哪个effect中
    track(target,key)
    
    const res=Reflect.get(target,key,recevier);//target[key]
    return res
  },
  set(target,key,value,recevier){
     let oldValue=(target as unknown)[key] 
    const res=Reflect.set(target,key,value,recevier)//target[key]=value
    //改值时，可以触发effect更新
   if(oldValue !== value){//值没变不需要触发effect执行
    trigeer(target,key)
   }
    
    return res
  }
}
```



## computed
computed接收一个函数，并根据getter的返回值返回一个不可变的响应式ref对象



```typescript
export function isFunction(value:unknown):boolean{
  return typeof value === 'function'
}
```

computed

```typescript
import { isFunction } from "@vue/shared";
import { isTacking, ReactiveEffect, trackEffects, triggerEffects } from "./effect";
class ComputedRefImpl{
  public dep;
  public _dirty=true
  public __v_isRef=true
  public effect
  public _value
  constructor(getter,public setter){
    this.effect=new ReactiveEffect(getter,()=>{
      if(!this._dirty){
        this._dirty=true;
        triggerEffects(this.dep)
      }
    })
  }

  get value(){
    if(isTacking()){
      trackEffects(this.dep||(this.dep=new Set))
    }
    if(this._dirty){
      //将结果缓存到this._value  不会每次都run
      this._value=this.effect.run()
      this._dirty=false
    }
   
   return this._value
  }

  set value(newVal){
    this.setter(newVal)
  }
}
export function computed(options){
   // 接收一个get函数或者get和set选项
   const onlyGetter=isFunction(options)

   let getter;
   let setter;
   if(onlyGetter){//如果是get函数
     getter=options
     setter=()=>{}
   }else{
    getter=options.get
    setter=options.set
   }
   return new ComputedRefImpl(getter,setter)
}
```

## ref

接收一个值并返回一个响应式可变的ref对象

```typescript
import { isTacking, trackEffects, triggerEffects } from "./effect";
import { toReactive } from "./reactive";

class RefImpl{
  public dep;
  public __v_isRef;
  public _value;
  constructor(public _rawValue){
     this._value=toReactive(_rawValue)
  }

  get value(){
    if(isTacking()){
      trackEffects(this.dep||(this.dep=new Set()))
    }
    return this._value
  }

  set value(newVal){
   if(newVal!==this._rawValue){
     this._rawValue=newVal
     this._value=toReactive(newVal)
     triggerEffects(this.dep)
   }
  }
}

function createRef(value){
  return new RefImpl(value)
}

export function ref(value){
   return createRef(value)
}
```

