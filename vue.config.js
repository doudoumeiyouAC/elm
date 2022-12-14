const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // publicPath: '/ele/',    //gitee远程库名
  // outputDir: 'dist/',
  // assetsDir: 'static/',

  // vue的反向代理，解决跨域问题，就是让前端的服务器去请求后端的接口
  devServer: {
    proxy: {
      // '/api': { // 这个字段开头的就通过代理下面的服务器
      //   target: 'https://elm.cangdu.org', // 需要代理的服务器
      //   changeOrigin: true, // 开启跨域
      //   // ws: true,
      //   // secure: true, // 当接口为https时
      //   pathRewrite: {
      //     '^/api': '/' // 重写路径名，把/api开头的重写成 ‘’ 空
      //   }
      // },
      '/v1': {
        target: 'https://elm.cangdu.org',
        changeOrigin: true,
        secure: false,
        // pathRewite: {
        //   '^/v2': '/'
        // }
      },
      '/v2': {
        target: 'https://elm.cangdu.org',
        changeOrigin: true,
        secure: false,
        // pathRewite: {
        //   '^/v2': '/'
        // }
      },
      // '/shopping': {
      //   target: 'https://elm.cangdu.org',
      //   changeOrigin: true,
      //   secure: false,
      //   // pathRewite: {
      //   //   '^/v2': '/'
      //   // }
      // },
      '/bos': {
        target: 'https://elm.cangdu.org',
        changeOrigin: true,
        secure: false,
        // pathRewite: {
        //   '^/v2': '/'
        // }
      }
    },
    https: true // 开启https协议
  }
})
