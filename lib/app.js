'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _main = require('./controllers/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/todoDB');
_mongoose2.default.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var app = (0, _express2.default)();
app.set('port', process.env.PORT || 3000);
app.set('views', _path2.default.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use((0, _methodOverride2.default)());

app.get('/', _main2.default.getIndex);
app.get('/templates/:template', _main2.default.getTemplate);
app.get('/todos', _main2.default.getAllTodos);
app.post('/todos', _main2.default.postNewTodo);
app.delete('/todos', _main2.default.deleteAllTodos);
app.delete('/todos/:id', _main2.default.deleteTodo);

/*
 setInterval(() => {
 let req = http.request({
 hostname: "localhost",
 port: app.get('port'),
 path: '/todos',
 method: 'DELETE'
 }, (res) => {
 res.setEncoding('utf8');
 res.on('data', function (chunk) {
 console.log('Response body: ' + chunk);
 });
 res.on('end', function() {
 console.log('Response end.')
 });
 });
 req.on('error', function(e) {
 console.log('Error with request: ' + e.message);
 });
 req.end();
 }, 1000 * 60 * 10);
 */

app.listen(app.get('port'), function () {
    console.log('\u0417\u0430\u043F\u0443\u0441\u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043D\u0430 \u043F\u043E\u0440\u0442\u0443: ' + app.get('port'));
});