document.getElementById('login-form').addEventListener('submit', async (event) => {
   event.preventDefault(); // Предотвращает отправку формы

   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;

   try {
      const response = await fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ username, password })
      });

      if (response.ok) {
         const data = await response.json();
         const token = data.token;
         localStorage.setItem('token', token);
         const role = data.role;

         if (role === 'admin') {
            window.location.href = '/admin';
         } else if (role === 'user') {
            window.location.href = '/';
            alert('Вы успешно авторизовались!');
         }
      } else {
         alert('Неверное имя пользователя или пароль');
      }
   } catch (error) {
      console.error('Произошла ошибка:', error);
   }
   console.log('Вход:', { username, password });
});

//Функция для регистрации пользователя
async function register() {
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;

   try {
      const response = await fetch('/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
         throw new Error('Ошибка регистрации: ' + response.statusText);
      }

      if (response.ok) {
         const data = await response.json();
         console.log('Регистрация:', data);
         window.location.href = '/';
         alert('Пользователь успешно зарегистрирован');
      } else {
         alert('Пользователь с таким именем уже существует');
      }
   } catch (error) {
      console.error('Произошла ошибка:', error);
   }
}
