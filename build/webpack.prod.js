// build/webpack.prod.js
// 引入清除打包后文件的插件（最新版的需要解构，不然会报不是构造函数的错，而且名字必须写CleanWebpackPlugin）
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')
// 引入配置合并插件
const merge = require('webpack-merge');
// 引入通用配置
const webpackCommonConfig = require('./webpack.config.js');
//压缩css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 抽离css代码
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
// 分析打包后模块分析插件
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: "production",
  // devtool: '#source-map',
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, '../dist'),
    // 打包后生成的js文件，带hash值来保证文件的唯一性
    filename: 'js/[name].[hash:4].js',
    // 生成的chunk文件名
    // chunkFilename: 'js/[name].[hash:4].js',
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
            
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
    new CleanWebpackPlugin(),
    new webpackBundleAnalyzer({
      analyzerMode: 'static',
    }),
    // 新建miniCssExtractPlugin实例并配置
    //压缩css代码
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:4].css',
      chunkFilename: 'css/[name].[hash:4].css'
    }),
    // 抽离css
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
  ],
  // optimization: {
  //   runtimeChunk: true,
  //   splitChunks: {
  //     cacheGroups: {
  //       // node_modules下的模块拆分到chunk-vendors.xxxx.js下
  //       vendors: {
  //         name: 'chunk-vendors',
  //         test: /[\\\/]node_modules[\\\/]/,
  //         priority: -10,
  //         chunks: 'all'
  //       },
  //       // 自己定义的公告组件超过两次引用的放在chunk-common.xxxx.js下
  //       common: {
  //         name: 'chunk-common',
  //         minChunks: 2,
  //         priority: -20,
  //         chunks: 'all',
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
});