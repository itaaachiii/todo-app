const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyMessage = document.getElementById('emptyMessage');

// Load todos on page load
document.addEventListener('DOMContentLoaded', loadTodos);

// Add todo on button click
addBtn.addEventListener('click', addTodo);

// Add todo on Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

async function loadTodos() {
    try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

async function addTodo() {
    const task = todoInput.value.trim();
    
    if (!task) {
        alert('Please enter a task!');
        return;
    }

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `task=${encodeURIComponent(task)}`
        });

        if (response.ok) {
            todoInput.value = '';
            todoInput.focus();
            loadTodos();
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function toggleTodo(id) {
    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT'
        });

        if (response.ok) {
            loadTodos();
        }
    } catch (error) {
        console.error('Error toggling todo:', error);
    }
}

async function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTodos();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }
}

function displayTodos(todos) {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        emptyMessage.classList.add('show');
    } else {
        emptyMessage.classList.remove('show');
    }

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="todo-text" onclick="toggleTodo(${todo.id})">\${escapeHtml(todo.task)}</span>
            <div class="todo-actions">
                <button class="check-btn" onclick="toggleTodo(${todo.id})">
                    \${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
