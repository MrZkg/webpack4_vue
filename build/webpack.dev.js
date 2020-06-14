// build/webpack.dev.js
const path = require('path')
const webpack = require('webpack');
// 引入webpack通用配置
const webpackCommonConfig = require('./webpack.config.js');
// 引入配置合并插件
const merge = require('webpack-merge');
// 引入控制台提示插件（针对webpack-dev-server）
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  // mode: "development",
  devtool: 'cheap-module-eval-source-map',
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, '../dist'),
    // 打包后生成的js文件，带hash值来保证文件的唯一性
    filename: 'js/[name].[hash:4].js',
    // 生成的chunk文件名
    // chunkFilename: 'js/[name].[hash:4].js',
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader', // 开发环境还是使用style-loader，不然无法及时响应样式变化
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // 辅助HotModuleReplacementPlugin插件
    // new webpack.NamedModulesPlugin(),
    // 启用热更新必须的
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: 127.0.0.1:8080`]
      }
    }),
  ],
  devServer: {
    // 默认情况( host: '0.0.0.0',)不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
    // 比如192.168.12.21:9000，手机在这个局网内也可以访问
    host: '127.0.0.1',
    hot: true,
    open: true,
    port: 8080,
    // 开发环境静态资源
    // contentBase: './dist',
    quiet: true,
    // overlay: true,  // 让错误信息显示在页面上  ？？
    proxy: {//反向代理
      '/api': {
        //代理的服务器地址
        target: 'http://127.0.0.1:8089',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    // contentBase: './dist',
    // clientLogLevel: "error", // 关闭在浏览器控制台显示消息的功能，可能的值有 none, error, warning 或者 info（默认值）。这里我设置为只显示错误消息
    // overlay: {
    //   errors: true,
    //   warnings: true
    // },

    // 防止刷新丢失
    historyApiFallback: {
      index: ''
    },

    // proxy:{
    //   // htttp://127.0.0.1:8081/ele/lala
    //   // 当访问的地址以/ele开头意味着，你要使用该代理
    //   "^/ele":{
    //       // 代理的服务器地址  http://127.0.0.1/adminLog
    //       target:"http://127.0.0.1",
    //       // 是否开启代理
    //       changeOrigin:true,// http://127.0.0.1/lala
    //       // 地址重写
    //       pathRewrite:{
    //           "^/ele":""
    //       }
    //   }
    // }
  }
});