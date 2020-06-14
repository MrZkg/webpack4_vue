// build/webpack.config.js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 拷贝静态资源
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');  
// 引入常量文件
const apiConfig = require('../config/apiConfig')
module.exports = {
  // dev:{
  //   publicPath:"/assets/"
  // },
  // build:{
  //   publicPath:"https://csdn.cdn.cn/"
  // },
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  // webpack打包的入口文件
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  // webpack打包的输出相关的额配置
 
  // devtool: "source-map",
   resolve: {
    alias: {
      // 写了这句，我们可以这样写代码 import Vue from 'vue', 并且引入的是vue/dist/vue.runtime.esm.js这个版本，不然默认引入的是vue.js。这个在github的vue官方仓库dist目录下有解释。
      'vue$': 'vue/dist/vue.runtime.esm.js',
      // 写了这句，我们可以这样写代码 import api from '@/api/api.js'，省去到处找路径定位到src的麻烦
      '@': path.resolve(__dirname, '../src')
    },
    // 添加一个 resolve.extensions 属性，方便我们引入依赖或者文件的时候可以省略后缀
    // 我们在引入文件时可以这样写 import api from '@/api/api'。
    extensions: ['*', '.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 使用vue官方的懒加载语法并结合babel需使用这个插件，不然会报错
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
          }	
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     implementation: require('dart-sass')
          //   }
          // },
          // {
          //   loader: 'postcss-loader'
          // }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当文件大于5kb时走file-loader相关的配置
              limit: 5120,
              // 这个参数要设置成false,不然生成图片的路径时[object Module]
              esModule: false,
              // 当文件大于5kb时走file-loader相关的配置
              fallback: 'file-loader',
              // 生成的路径和文件名
              name: 'images/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              esModule: false,
              fallback: 'file-loader',
              name: 'media/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              esModule: false,
              fallback: 'file-loader',
              name: 'fonts/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      // 指定模板
      template: path.resolve(__dirname, '../public/index.html'),
      // 输出的文件
      filename: path.resolve(__dirname, '../dist/index.html'),
      // 图标
      favicon:  path.resolve(__dirname, '../src/assets/logo.png'),
    }),
    new VueLoaderPlugin(),
      // 拷贝静态资源
    new copyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, '../doc'),
          to: path.resolve(__dirname, '../dist/doc')
        }
      ],
    }),
    // 定义环境变量
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('development...')
    //   }
    // }),
     // 全局变量
     new webpack.DefinePlugin({
      API_CONFIG: JSON.stringify(apiConfig)
    })
  ]
}
