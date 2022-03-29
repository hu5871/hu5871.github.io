### 微信小程序怎么传值

- data-xxx

  给元素添加data-xxx 属性，绑定需要传递的值。然后通过e.currentTarget.dataset或者params参数获取

- navigator url的值

- app.js 中定义全局变量

### 微信小程序的生命周期

- onLoad：页面加载是处罚，一个页面只会调用一次
- onShow：页面显示时触发
- onReady：页面初次渲染时触发，一个页面只调用一次
- onHide：页面隐藏时触发
- onUnload：页面卸载时触发
