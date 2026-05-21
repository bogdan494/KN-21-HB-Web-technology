const tableBody = document.getElementById('table-body');
const refreshBtn = document.getElementById('refresh-btn');
const addUserForm = document.getElementById('add-user-form');

let currentMaxId = 0;


async function fetchUsers() {
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
        
    tableBody.innerHTML = '';
        
    // Виводимо отриманих користувачів у таблицю
    users.forEach(user => {
        renderUserRow(user.id, user.name, user.email);
        if (user.id > currentMaxId) {
            currentMaxId = user.id; // Запам'ятовуємо останній ID
        }
    });
    
}

// Створення та додавання рядка в таблицю
function renderUserRow(id, name, email) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><b>${id}</b></td>
        <td>${name}</td>
        <td>${email}</td>
    `;
    
    tableBody.appendChild(row);
}

refreshBtn.addEventListener('click', fetchUsers);

// Додавання нового запису в таблицю

addUserForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Запобігаємо перезавантаженню сторінки

    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');

    currentMaxId++;

    renderUserRow(currentMaxId, nameInput.value.trim(), emailInput.value.trim());

    addUserForm.reset();
});

fetchUsers();