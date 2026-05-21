document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Отримуємо значення з полів
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const age = document.getElementById('age').value;
    
    // Отримуємо вибрану радіо-кнопку статі
    const genderRadio = document.querySelector('input[name="gender"]:checked');

    // Змінна для відстеження загального статусу валідації
    let isValid = true;

    // Очищаємо попередні помилки перед новою перевіркою
    document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');

    // 1. Валідація імені 
    if (username === '') {
        document.getElementById('username-error').textContent = "Ім'я є обов'язковим для заповнення.";
        isValid = false;
    }

    // 2. Валідація email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('email-error').textContent = "Email є обов'язковим.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = "Введіть коректний формат email";
        isValid = false;
    }

    // 3. Валідація пароля 
    if (password === '') {
        document.getElementById('password-error').textContent = "Пароль є обов'язковим.";
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('password-error').textContent = "Пароль має містити щонайменше 6 символів.";
        isValid = false;
    }

    // 4. Підтвердження пароля 
    if (confirmPassword === '') {
        document.getElementById('confirm-password-error').textContent = "Будь ласка, повторіть пароль.";
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = "Паролі не збігаються.";
        isValid = false;
    }

    // 5. Валідація віку 
    if (age === '') {
        document.getElementById('age-error').textContent = "Вік є обов'язковим.";
        isValid = false;
    } else {
        const parsedAge = parseInt(age);
        if (parsedAge < 10) {
            document.getElementById('age-error').textContent = "Доступ дозволено лише користувачам від 10 років.";
            isValid = false;
        }
    }

    // 6. Валідація статі 
    if (!genderRadio) {
        document.getElementById('gender-error').textContent = "Будь ласка, оберіть вашу стать.";
        isValid = false;
    }

    // Фінальний результат
    if (isValid) {
        alert("Реєстрація успішна!");
        
    }
});