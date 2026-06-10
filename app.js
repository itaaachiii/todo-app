const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// In-memory storage for todos
let todos = [];
let id = 1;

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// API endpoint to add a new todo
app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === '') {
        return res.status(400).json({ error: 'Task cannot be empty' });
    }
    const newTodo = {
        id: id++,
        task: task.trim(),
        completed: false
    };
    todos.push(newTodo);
    res.json(newTodo);
});

// API endpoint to update a todo (mark as completed)
app.put('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    res.json(todo);
});

// API endpoint to delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Todo App running at http://localhost:${PORT}`);
});
