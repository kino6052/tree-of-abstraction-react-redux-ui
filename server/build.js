'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = exports.jsonBodyParser = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexEndpoints = function indexEndpoints(app) {
  app.get('/item', function (req, res) {
    _axios2.default.get('https://personal-dashboard-umbrella-kino6052.c9users.io/item').then(function (response) {
      var data = response.data;

      res.send(data);
    });
  });
  app.get('/note', function (req, res) {
    _axios2.default.get('https://personal-dashboard-umbrella-kino6052.c9users.io/note').then(function (response) {
      var data = response.data;

      res.send(data);
    });
  });
};

var jsonBodyParser = exports.jsonBodyParser = _bodyParser2.default.json();
var app = exports.app = (0, _express2.default)();
indexEndpoints(app);
console.log();
app.use('/static', _express2.default.static(_path2.default.join(__dirname, '/build')));
app.listen('4000', function () {
  return console.log('Listening... ' + process.env.PORT);
});
