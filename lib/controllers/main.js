'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Todo = require('../models/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainController = {
    getIndex: function getIndex(req, res) {
        res.render('index');
    },
    getTemplate: function getTemplate(req, res) {
        res.render('templates/' + req.params.template);
    },
    getAllTodos: function getAllTodos(req, res) {
        _Todo2.default.find({}, function (err, todos) {
            if (err) {
                return res.send(err);
            }
            res.json(todos);
        });
    },
    postNewTodo: function postNewTodo(req, res) {
        _Todo2.default.create({
            date: req.body.date,
            price: req.body.price,
            persent: req.body.persent,
            come: req.body.come,
            done: false
        }, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            _Todo2.default.find({}, function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    },
    deleteTodo: function deleteTodo(req, res) {
        _Todo2.default.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            _Todo2.default.find({}, function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    },
    deleteAllTodos: function deleteAllTodos(req, res) {
        _Todo2.default.remove({}, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            _Todo2.default.find({}, function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    }
};

exports.default = mainController;