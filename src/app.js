import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';
import http from 'http';

import mainController from './controllers/main';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/todoDB');
mongoose.connection.on('error', function ()
{
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

let app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/todos', mainController.getAllTodos);
app.post('/todos', mainController.postNewTodo);
app.delete('/todos', mainController.deleteAllTodos);
app.delete('/todos/:id', mainController.deleteTodo);

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

app.listen(app.get('port'), function ()
{
    console.log(`Запуск сервера на порту: ${app.get('port')}`);
});
