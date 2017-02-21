import Todo from '../models/Todo';

let mainController = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getTemplate: (req, res) => {
        res.render('templates/' + req.params.template);
    },
    getAllTodos: (req, res) => {
        Todo.find({}, (err, todos) => {
            if (err)
            {
                return res.send(err);
            }
            res.json(todos);
        });
    },
    postNewTodo: (req, res) => {
        Todo.create({
            date: req.body.date,
            price: req.body.price,
            persent: req.body.persent,
            come: req.body.come,
            done: false
        }, (err, todo) => {
            if (err)
            {
                return res.send(err);
            }
            Todo.find({}, (err, todos) => {
                if (err)
                {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    },
    deleteTodo: (req, res) => {
        Todo.remove({
            _id: req.params.id
        }, (err, todo) => {
            if (err)
            {
                return res.send(err);
            }
            Todo.find({}, (err, todos) => {
                if (err)
                {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    },
    deleteAllTodos: (req, res) => {
        Todo.remove({}, (err, todo) => {
            if (err)
            {
                return res.send(err);
            }
            Todo.find({}, (err, todos) => {
                if (err)
                {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    }
}

export default mainController;
