// 全局变量
const NODE_ENV = process.env.NODE_ENV; // webpack编译是获取node环境的配置信息
const config = {
  production: { // 生产环境(线上环境)
    DOMAIN: 'production.com', // 上线域名、地址
    FOO_API: 'production.foo.api.com', // api变量
    BAR_API: 'production.bar.api.com', // api变量
    BAZ_API: 'production.baz.api.com', // api变量
  },
  development: { // 开发环境
    DOMAIN: 'development.com', // 测试域名、地址
    FOO_API: 'development.foo.api.com', // api变量
    BAR_API: 'development.bar.api.com', // api变量
    BAZ_API: 'development.baz.api.com', // api变量
  }
}
module.exports = config[NODE_ENV];