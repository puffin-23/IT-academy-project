document.addEventListener('DOMContentLoaded', () => {
   const authButton = document.getElementById('login-button');
   const token = localStorage.getItem('token');
   const role = localStorage.getItem('role');

   // Проверяем, есть ли токен
   if (token) {
       // Если пользователь авторизован
       authButton.textContent = 'Выйти';

       authButton.addEventListener('click', () => {
           // Выход из кабинета
           localStorage.removeItem('token'); // Удаляем токен
           localStorage.removeItem('role');  // Удаляем роль

           // Перенаправление на страницу входа
           window.location.href = '/login';
       });
   } else {
       // Если пользователь не авторизован
       authButton.textContent = 'Войти/Зарегистрироваться';
       authButton.addEventListener('click', () => {
           // Перенаправление на страницу входа/регистрации
           window.location.href = '/login'; // Здесь можно указать URL для регистрации
       });
   }
});