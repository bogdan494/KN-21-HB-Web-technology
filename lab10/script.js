document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Відновлення імені з LocalStorage при завантаженні сторінки
    if (localStorage.getItem("savedName")) {
        nameInput.value = localStorage.getItem("savedName");
    }

    // Автоматичне збереження імені в LocalStorage при введенні
    nameInput.addEventListener("input", () => {
        localStorage.setItem("savedName", nameInput.value);
    });

    // Обробка відправки форми
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Перевірка заповненості полів
        if (nameValue === '' || emailValue === '' || messageValue === '') {
            alert('Помилка! Будь ласка, заповніть усі поля форми.');
            return;
        }

        // Відображення привітання
        alert(`Привіт, ${nameValue}! Ваше повідомлення успішно надіслано.`);

        // Виведення даних у консоль браузера
        console.group("Дані з форми:");
        console.log("Ім'я:", nameValue);
        console.log("Email:", emailValue);
        console.log("Повідомлення:", messageValue);
        console.groupEnd();

        emailInput.value = "";
        messageInput.value = "";
    });
});

const viewsDisplay = document.getElementById("views-count");

let views = localStorage.getItem("pageViews") ? parseInt(localStorage.getItem("pageViews")) : 0;
    
views++;

localStorage.setItem("pageViews", views);
    
viewsDisplay.textContent = views;