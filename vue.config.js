const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // vue的反向代理，解决跨域问题，就是让前端的服务器去请求后端的接口
  devServer: {
    proxy: {
      '^/v': { // 这个字段开头的就通过代理下面的服务器
        target: 'https://elm.cangdu.org', // 需要代理的服务器
        changeOrigin: true, // 开启跨域
        // ws: true,
        secure: false, // 当接口为https时
        // pathRewrite: {
        //   '^/api': '' // 重写路径名，把/api开头的重写成 ‘’ 空
        // }
      },
      // '/v2': {
      //   target: 'https://elm.cangdu.org',
      //   changeOrigin: true,
      //   secure: false,
      //   // pathRewite: {
      //   //   '^/v2': '/'
      //   // }
      // }
    },
    https: true // 开启https协议
  }
})
