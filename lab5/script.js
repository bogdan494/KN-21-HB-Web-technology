const chekButton = document.getElementById('chekButton');
const editButton = document.getElementById('editButton');
const vievText = document.getElementById('myText');
const mouseButton = document.getElementById('mouseButton');
const addElement =  document.getElementById('addElement');
const container = document.getElementById('container');
const delElement = document.getElementById('delElement');

// Додаткова кнопка
let counter = 10;
chekButton.addEventListener('click', function() {
    if (counter > 0) {
        counter --;
        if (counter > 0) {
            chekButton.textContent = `Натисніть ${counter} разів`;
        } else {
            chekButton.textContent = 'Готово!';
            alert('Гуменчук Богдан, варіант 10');
        }
    }
});

// Зміна тексту
editButton.addEventListener('click', function() {
    vievText.textContent = 'Текст змінено! Це новий вміст.';
});

// Наведення курсора
mouseButton.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#085c75';
});

mouseButton.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#f1f1f1';
});

// Додавання елементів
addElement.addEventListener('click', function() {
    let newElement = document.createElement('p');
    newElement.textContent = "Це новий доданий елемент.";
    newElement.classList.add('element');
    container.appendChild(newElement);
});

// Видалення елементів
delElement.addEventListener('click', function(){
    let listElement = container.lastElementChild;
    if (listElement) {
        container.lastChild.remove();
    } else {
        alert('Нічого видалити');
    }

});