// Отримуємо доступ до елементів додаткового завдання
const startBtn = document.getElementById('start-circle-btn');
const circle = document.getElementById('moving-circle');

// 1. Обробник події кліку на кнопку для запуску/зупинки руху кола
startBtn.addEventListener('click', function() {
    // toggle додає клас, якщо його немає, або видаляє, якщо він є
    circle.classList.toggle('circle-running');
    
    // Змінюємо текст кнопки залежно від стану
    if (circle.classList.contains('circle-running')) {
        startBtn.textContent = "Зупинити рух кола";
    } else {
        startBtn.textContent = "Запустити рух кола";
    }
});

//  Генерація випадкового кольору
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//  Зміна кольору кола кожні 10 секунд
setInterval(function() {
    const newColor = getRandomColor();
    circle.style.backgroundColor = newColor;
}, 10000);