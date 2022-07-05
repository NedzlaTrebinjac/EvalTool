const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const { getAllTodos, postOneTodo, deleteTodo, editTodo } = require('./APIs/todos');

app.use(cors());

// TODOS

app.get('/todos', getAllTodos);

app.post('/todo', postOneTodo);

app.delete('/todo/:todoId', deleteTodo);

app.put('/todo/:todoId', editTodo);

exports.api = functions.https.onRequest(app);