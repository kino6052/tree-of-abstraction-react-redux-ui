const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/item', { target: 'http://localhost:4001' }));
};