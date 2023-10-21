const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const list = [
    {
        id: '1',
        item: 'Trabalho de Matemática'
    }, {
        id: '2',
        item: 'Trabalho de Português'
    }
];

app.get('/todo/list', (req, res) => {
    res.json(list);
});

app.get('/todo/:id', (req, res) => {

    if (!req.params.id || req.params.id === null) {
        res.status(400).json('Bad request');
        return;
    }

    const todoItem = list.filter(todo => todo.id === req.params.id)[0];

    if (!todoItem || todoItem === null) {
        res.status(404).json('Not Found');
        return;
    }

    res.json(todoItem);
});

app.post('/todo', (req, res) => {

    if (!req.body.item || req.body.item === null) {
        res.status(400).json('Bad request');
        return;
    }

    const item = {
        id: '3',
        item: req.body.item
    };

    list.push(item);

    res.json(list);
});

app.put('/todo/:id', (req, res) => {
    if (!req.params.id || req.params.id === null) {
        res.status(400).json('Bad request');
        return;
    }

    const todoItem = list.filter(todo => todo.id === req.params.id)[0];

    if (!todoItem || todoItem === null) {
        res.status(404).json('Not Found');
        return;
    }

    const indexItem = list.indexOf(todoItem);

    todoItem.item = req.body.item;

    list[indexItem] = todoItem;

    res.json(list);
});

app.delete('/todo/:id', (req, res) => {
    if (!req.params.id || req.params.id === null) {
        res.status(400).json('Bad request');
        return;
    }

    const todoItem = list.filter(todo => todo.id === req.params.id)[0];
    if (!todoItem || todoItem === null) {
        res.status(404).json('Not Found');
        return;
    }

    const indexItem = list.indexOf(todoItem);
    list.splice(indexItem, 1);

    res.json(list);
});

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
