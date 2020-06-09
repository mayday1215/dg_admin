const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', {
    target: 'http://localhost:5000',
    changeOrigin:true,
    pathRewrite: {
      "^/api": "/" // 把/api 变成空
    }
  }));
  app.use(proxy('/weather', {
    target: 'http://api.map.baidu.com/',    // 目标服务器 host
    secure: false,
    changeOrigin: false,                         //是否需要改变原始主机头为目标URL默认false，
  }));



}
