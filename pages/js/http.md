## http系列



### 什么是HTTP? HTTP 和 HTTPS 的区别?

#### http

`http` 即超文本运输协议，是实现网络通信的一种规范。在计算机和网络世界有，存在不同的协议，如广播协议、寻址协议、路由协议等等......。而`http` 是一种传输协议，在实际应用中`http` 常被用于web浏览器和服务器之间传递信息，以`明文` 方式发送内容，不提供任何方式的数据加密。

特点：

1. 支持客户/服务器模式
2. 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。由于http协议简单，使得http服务器的程序规模小，因而通信速度快
3. 灵活:http允许传输任意类型的数据对象。正在传输的类型有Content-Type加以标记
4. 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户请求，并收到客户的应答后，即断开连接。采用这种方式方式可以节省传输时间
5. 无状态：http协议无法根据之前的状态进行本次的请求处理。
6. 端口：使用的是80



#### https

`htpp` 是以明文的形式发送内容，这并不安全。而 `https` 出现正是为了解决`http` 不安全的特性。



为了保证这些隐私数据能加密传输，让`http ` 运行安全



## 



### http状态码

- 1开头：信息提示
  - 100：继续，初始的请求已经接受，请客户端继续发送剩余部分
  - 101：切换协议，表示**服务器**应**客户端****升级协议**的请求对协议进行切换
- 2开头：成功
  - 200：成功，服务器已成狗处理了请求
  - 201：已创建，请求成功并且服务器创建了新的资源
  - 202：已接受，服务器已接受请求，但尚未处理
  - 203：非授权信息，服务器已成功处理请求，返回的信息可能来自另一个来源
  - 204：无内容，服务器成功处理了请求，但没有返回任何内容
  - 205：重置内容，服务器处理成功，用户终端应重置文档视图
  - 206：部分内容，服务器成功处理了部分GET请求

- 3开头：重定向

  - 300：多种选择，针对请求，服务器可执行多种操作

  - 301:永久重定向
  - 302:临时重定向
  - 303:当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。这个方法的存在主要是为了允许由脚本激活的POST请求输出重定向到一个新的资源。
  - 304:缓存没有过期或更改，可以继续使用
  - 305 使用代理 Use Proxy
  - 306:已被废弃
  - 307:临时重定向，它不允许浏览器将原本为post请求重定向到get请求上
  - 308:永久重定向，它不允许浏览器将原本为post请求重定向到get请求上

- 4开头：客户端错误

  - 400： Bad Request客户端请求的语法错误，服务器无法理解
  - 401： Unauthorized请求要求用户的身份认证；
  - 402： Payment Required保留，将来使用
  - 403：拒绝或者禁止访问
  - 404： Not Found服务器无法根据客户端的请求找到资源(网页)。
  - 405： Method Not Allowed客户端请求中的方法被禁止；
  - 406：Not Acceptable服务器无法根据客户端请求的内容特性完成请求；
  - 407： Proxy Authentication Required请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权；
  - 408： Request Time-out服务器等待客户端发送的请求时间过长；
  - 409：冲突，服务器在完成请求时发生冲突
  - 410：已删除，客户端请求的资源已经不存在
  - 411：需要有效长度，服务器不接受不含有效长度表头长度字段
  - 412：未满足前提条件，服务器未满足请求者在请求中设置的其中一个前提条件
  - 413：请求体过大，由于请求体过大，服务器无法处理，因此拒绝请求
  - 414：请求url过长，url过长，服务器无法处理
  - 415：不支持的格式，服务器无法处理请求中附带的媒体格式
  - 416：范围无效，请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含if-Range请求字段
  - 417：未满足期望，服务器不满足请求expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求

- 5开头：服务端错误

  - 500：服务器内部错误
  - 501：尚未实施，服务器不具备完成请求的功能或不支持请求的函数
  - 502：错误网关，服务器作为网关或者代理出现错误
  - 503：服务不可用，服务器目前无法使用
  - 504：网关超时，网关或代理服务器，未及时获取请求
  - 505：不支持版本，服务器不支持请求中使用的http协议版本

### 

### 强缓存和协商缓存

- ##### 强缓存：不会发送请求到服务器，而是直接从缓存中取

  `http状态码` ：200

  > 服务端通过设置`Expires` 和`Cache-Control`来实现

  `Cache-Control`可以组合使用多个指令：

  | 指令         | 作用                                                     |
  | ------------ | -------------------------------------------------------- |
  | public       | 表示响应可以被客户端金和代理服务器缓存                   |
  | private      | 表示响应只可以被客户端缓存                               |
  | max-age=30   | 缓存30秒后过期，需要重新请求                             |
  | s-maxage=30  | 覆盖max-age,作用一样，只在代理服务器中生效               |
  | no-store     | 不缓存任何响应                                           |
  | no-cache     | 资源被缓存，但是立即失效，下次会发起请求验证资源是否过期 |
  | max-stale=30 | 30秒内，即使缓存过期，也会使用该缓存                     |
  | min-fresh=30 | 希望在30秒内获取最新的响应                               |

  

- ##### 协商缓存：会发送请求到服务器，通过服务器来告知缓存是否可用

  `http状态码` ：304

  > 协商缓存表示如果缓存过期，那么就需要重新发起请求验证资源是否更新，可通过设置HTTP Header的last-modified和ETag来实现
  