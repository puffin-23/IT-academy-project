document.getElementById('login-form').addEventListener('submit', function(event) {
   event.preventDefault(); // Предотвращает отправку формы

   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   // Здесь можно добавить логику для входа в кабинет пользователя
   console.log('Вход:', { email, password });
   alert('Вход выполнен!'); // Замените эту строку вашей логикой входа
});

function register() {
   // Здесь можно добавить логику для регистрации
   alert('Форма регистрации!'); // Замените эту строку вашей логикой регистрации
}