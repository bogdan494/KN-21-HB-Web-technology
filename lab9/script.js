const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

const sortAlphaBtn = document.getElementById('sort-alpha-btn');
const sortDateBtn = document.getElementById('sort-date-btn');
const filterCompletedBtn = document.getElementById('filter-completed-btn');
const filterActiveBtn = document.getElementById('filter-active-btn');
const filterAllBtn = document.getElementById('filter-all-btn');


let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // Може бути 'all', 'completed', 'active'

// Збереження масиву
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Формування поточної дати
function getCurrentDateString() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Відображення списку з урахуванням фільтрів
function renderTodos() {
    todoList.innerHTML = '';

    // Фільтруємо масив перед рендерингом
    let filteredTodos = todos;
    if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    } else if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    }

    filteredTodos.forEach((todo, index) => {
        const originalIndex = todos.indexOf(todo);

        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${originalIndex}">
            <span class="todo-text">${todo.text} <span class="todo-date">(${todo.date})</span></span>
            <button class="action-btn edit-btn" data-index="${originalIndex}">✏️</button>
            <button class="action-btn delete-btn" data-index="${originalIndex}">❌</button>
        `;
        todoList.appendChild(li);
    });
}


// 1. Додавання нового завдання
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTodo = {
        text: text,
        completed: false,
        date: getCurrentDateString(),
        timestamp: Date.now()
    };

    todos.push(newTodo);
    saveToLocalStorage();
    renderTodos();
    todoInput.value = '';
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Обробка подій всередині списку
todoList.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if (index === null) return;

    const targetIndex = parseInt(index);

    // Зміна статусу виконання
    if (e.target.type === 'checkbox') {
        todos[targetIndex].completed = e.target.checked;
        saveToLocalStorage();
        renderTodos();
    } 
    // Видалення завдання
    else if (e.target.classList.contains('delete-btn')) {
        todos.splice(targetIndex, 1);
        saveToLocalStorage();
        renderTodos();
    } 
    // Редагування завдання
    else if (e.target.classList.contains('edit-btn')) {
        const currentText = todos[targetIndex].text;
        const newText = prompt('Редагувати завдання:', currentText);
        
        if (newText !== null && newText.trim() !== '') {
            todos[targetIndex].text = newText.trim();
            saveToLocalStorage();
            renderTodos();
        }
    }
});

// Сортування за алфавітом
sortAlphaBtn.addEventListener('click', () => {
    todos.sort((a, b) => a.text.localeCompare(b.text));
    saveToLocalStorage();
    renderTodos();
});

// Сортування за датою
sortDateBtn.addEventListener('click', () => {
    todos.sort((a, b) => b.timestamp - a.timestamp);
    saveToLocalStorage();
    renderTodos();
});

// Обробники фільтрів
filterAllBtn.addEventListener('click', () => {
    currentFilter = 'all';
    renderTodos();
});

filterCompletedBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    renderTodos();
});

filterActiveBtn.addEventListener('click', () => {
    currentFilter = 'active';
    renderTodos();
});

renderTodos();