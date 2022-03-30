### webppack

简述webpack.config.js配置及作用,在这里不会阐述这些插件

```js
module.export={
  mode: 'development',//当前的环境
  entry:'./src/mian.js',//入口：它告诉webpack应该从哪开始构建内部依赖图的开始
  output:{//出口
    path:path.resolve(__dirname,'dist'),//输出的文件路径
    filename:'bundle.js',//输出的文件名
  },
  resolve:{
    extensions:['.js','.vue','.css','.jsx'],//解析文件时，按照顺序查找后缀
  },
  module:{//针对不同的模块做处理 
    relus:[//匹配规则
      {
        test: /\.vue$/,//当匹配到vue文件时，使用vue-loader
        use:'vue-loader'
      },
      {
        test:/\.css$/,//匹配到css文件时
        use:['vue-style-loader','css-loader']
      },
      {
        test:/\.js$/,//匹配到js文件时
        use:{
          options:{
            presets:['@babel/preset-env'],//js文件通过es6转换es5的插件转换
            loader:'babel-loader',
            exclude:/node_modules/,//排除
            
          }
        }
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({tempalte,'./publice/html'}),//打包的结果自动插入到html中
  ]
}
```

