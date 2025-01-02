document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.getElementById('content-area');

    function loadUsers() {
        contentArea.innerHTML = `
            <h2>Редактирование Пользователей</h2>
            <div id="users-list"></div>
        `;
        fetch('/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Role': localStorage.getItem('role'),
            }
        })
            .then(response => response.json())
            .then(data => {
                const usersList = document.getElementById('users-list');
                data.forEach(user => {
                    const userItem = document.createElement('div');
                    userItem.innerHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>Название данных</th>
                                    <th>Описание</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>username</td>
                                    <td>${user.username}</td>
                                    <td>
                                        <button onclick="editUser(${user.id})">Редактировать</button>
                                        <button onclick="deleteUser(${user.id})">Удалить</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>role</td>
                                    <td>${user.role}</td>
                                    <td>
                                        <button onclick="editUser(${user.id})">Редактировать</button>
                                        <button onclick="deleteUser(${user.id})">Удалить</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                `;
                    usersList.appendChild(userItem);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    async function loadCakes() {
        contentArea.innerHTML = `
            <h2>Редактирование Тортов</h2>
            <div id="cakes-list"></div>
        `;
        const response = await fetch('/admin/cakes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Role': localStorage.getItem('role'),
            }
        })
        const data = await response.json();
        if (response.ok) {
            const cakesList = document.getElementById('cakes-list');
            data.forEach(cake => {
                const cakeItem = document.createElement('div');
                cakeItem.innerHTML = `
                    <table>
    <thead>
        <tr>
            <th>Название данных</th>
            <th>Описание</th>
            <th>Действия</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span>Заголовок</span></td>
            <td><span>${cake.header}</span></td>
            <td>
                <button onclick="editCake(${cake.id})">Редактировать</button>
                <button onclick="deleteCake(${cake.id})">Удалить</button>
            </td>
        </tr>
        <tr>
            <td><span>Meta Keywords</span></td>
            <td><span>${cake.metakeywords}</span></td>
            <td>
                <button onclick="editCake(${cake.id})">Редактировать</button>
                <button onclick="deleteCake(${cake.id})">Удалить</button>
            </td>
        </tr>
        <tr>
            <td><span>Meta Description</span></td>
            <td><span>${cake.metadescription}</span></td>
            <td>
                <button onclick="editCake(${cake.id})">Редактировать</button>
                <button onclick="deleteCake(${cake.id})">Удалить</button>
            </td>
        </tr>
        <tr>
            <td><span>URL</span></td>
            <td><span>${cake.url_code}</span></td>
            <td>
                <button onclick="editCake(${cake.id})">Редактировать</button>
                <button onclick="deleteCake(${cake.id})">Удалить</button>
            </td>
        </tr>
        <tr>
            <td><span>Контент</span></td>
            <td><span>${cake.content}</span></td>
            <td>
                <button onclick="editCake(${cake.id})">Редактировать</button>
                <button onclick="deleteCake(${cake.id})">Удалить</button>
            </td>
        </tr>
        <tr>
            <td><span>Изображение</span></td>
            <td><img src="${cake.image_cake}" alt="${cake.header}" width="100" height="100"></td>
            <td>
                <button onclick="editCake(${cake.id})">Редактировать</button>
                <button onclick="deleteCake(${cake.id})">Удалить</button>
            </td>
        </tr>
    </tbody>
</table>
    
                `;
                cakesList.appendChild(cakeItem);
            });
        }
        else {
            console.error('Ошибка при получении данных:', data);
        }
    }
    async function loadCupcakes() {
        contentArea.innerHTML = `
            <h2>Редактирование Капкейков</h2>
            <div id="cupcakes-list"></div>
        `;
        const response = await fetch('/admin/cupcakes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Role': localStorage.getItem('role'),
            }
        })
        const data = await response.json();
        if (response.ok) {
            const cupcakesList = document.getElementById('cupcakes-list');
            data.forEach(cupcake => {
                const cupcakeItem = document.createElement('div');
                cupcakeItem.innerHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>Название данных</th>
                                <th>Описание</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>Заголовок</span></td>
                                <td><span>${cupcake.header}</span></td>
                                <td>
                                    <button onclick="editCupcake(${cupcake.id})">Редактировать</button>
                                    <button onclick="deleteCupcake(${cupcake.id})">Удалить</button>
                                </td>
                            </tr>
                            <tr>
                                <td><span>Meta Keywords</span></td>
                                <td><span>${cupcake.metakeywords}</span></td>
                                <td>
                                    <button onclick="editCupcake(${cupcake.id})">Редактировать</button>
                                    <button onclick="deleteCupcake(${cupcake.id})">Удалить</button>
                                </td>
                            </tr>
                            <tr>
                                <td><span>Meta Description</span></td>
                                <td><span>${cupcake.metadescription}</span></td>
                                <td>
                                    <button onclick="editCupcake(${cupcake.id})">Редактировать</button>
                                    <button onclick="deleteCupcake(${cupcake.id})">Удалить</button>
                                </td>
                            </tr>
                            <tr>
                                <td><span>URL</span></td>
                                <td><span>${cupcake.url_code}</span></td>
                                <td>
                                    <button onclick="editCupcake(${cupcake.id})">Редактировать</button>
                                    <button onclick="deleteCupcake(${cupcake.id})">Удалить</button>
                                </td>
                            </tr>
                            <tr>
                                <td><span>Контент</span></td>
                                <td><span>${cupcake.content}</span></td>
                                <td>
                                    <button onclick="editCupcake(${cupcake.id})">Редактировать</button>
                                    <button onclick="deleteCupcake(${cupcake.id})">Удалить</button>
                                </td>
                            </tr>
                            <tr>
                                <td><span>Изображение</span></td>
                                <td><img src="${cupcake.image_cupcake}" alt="${cupcake.header}" width="100" height="100"></td>
                                <td>
                                    <button onclick="editCupcake(${cupcake.id})">Редактировать</button>
                                    <button onclick="deleteCupcake(${cupcake.id})">Удалить</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                `;
                cupcakesList.appendChild(cupcakeItem);
            });
        }
        else {
            console.error('Ошибка при получении данных:', data);
        }
    }

    window.editUser = async function (id) {
        try {
            const response = await fetch(`/admin/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                    'Role': localStorage.getItem('role'),
                }
            })
            const data = await response.json();
            if (response.ok) {
                contentArea.innerHTML = `
                    <h2>Редактирование Пользователя</h2>
                    <form id="user-form">
                        <label for="username">Имя пользователя:</label>
                        <input type="text" id="username" value="${data.username}" required>
                        <label for="role">Роль:</label>
                        <select id="role" required>
                            <option value="admin">Администратор</option>
                            <option value="user">Пользователь</option>
                        </select>
                        <button type="submit">Сохранить</button>
                    </form>
                `;
                const userForm = document.getElementById('user-form');
                userForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const username = document.getElementById('username').value;
                    const role = document.getElementById('role').value;

                    try {
                        const response = await fetch(`/admin/users/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                'Role': localStorage.getItem('role'),
                            },
                            body: JSON.stringify({ username, role })
                        });

                        if (response.ok) {
                            const data = await response.json();
                            alert('Пользователь успешно обновлен');
                            window.location.reload();
                        } else {
                            const errorData = await response.json();
                            alert(errorData.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }

                });
            } else {
                console.error('Ошибка при получении данных:', data);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }
    window.editCake = async function (id) {
        try {
            const response = await fetch(`/admin/cakes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                    'Role': localStorage.getItem('role'),
                }
            })
            const data = await response.json();
            if (response.ok) {
                const cake = data
                contentArea.innerHTML = `
                    <h2>Редактирование Торта</h2>
                        <form id="cake-form">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label for="header">Заголовок:</label></td>
                                        <td><input type="text" id="header" name="header" value="${cake.header}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="metakeywords">Meta Keywords:</label></td>
                                        <td><input type="text" id="metakeywords" name="metakeywords" value="${cake.metakeywords}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="metadescription">Meta Description:</label></td>
                                        <td><input type="text" id="metadescription" name="metadescription" value="${cake.metadescription}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="url_code">URL:</label></td>
                                        <td><input type="text" id="url_code" name="url_code" value="${cake.url_code}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="image_cake">Изображение:</label></td>
                                        <td><input type="file" id="image_cake" name="image_cake"></td>

                                    </tr>
                                    <tr>
                                        <td><label for="content">Контент:</label></td>
                                        <td><textarea id="content" name="content" required>${cake.content}</textarea></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                        <button type="submit">Сохранить</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                `;

                document.getElementById('cake-form').onsubmit = async function (event) {
                    event.preventDefault();
                    const formData = new FormData();
                    formData.append('header', document.getElementById('header').value);
                    formData.append('metakeywords', document.getElementById('metakeywords').value);
                    formData.append('metadescription', document.getElementById('metadescription').value);
                    formData.append('url_code', document.getElementById('url_code').value);
                    formData.append('image_cake', document.getElementById('image_cake').files[0]);
                    formData.append('content', document.getElementById('content').value);

                    try {
                        const response = await fetch(`/admin/cakes/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Authorization': localStorage.getItem('token'),
                                'Role': localStorage.getItem('role'),
                            },
                            body: formData
                        });

                        if (response.ok) {
                            const data = await response.json();
                            alert('Торт успешно обновлен');
                            window.location.reload();
                        } else {
                            const errorData = await response.json();
                            alert(errorData.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            } else {
                console.error('Ошибка при получении данных:', data);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    window.editCupcake = async function (id) {
        try {
            const response = await fetch(`/admin/cupcakes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                    'Role': localStorage.getItem('role'),
                }
            })
            const data = await response.json();
            if (response.ok) {
                const cupcake = data
                contentArea.innerHTML = `
                    <h2>Редактирование Капкейков</h2>
                        <form id="cupcake-form">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label for="header">Заголовок:</label></td>
                                        <td><input type="text" id="header" name="header" value="${cupcake.header}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="metakeywords">Meta Keywords:</label></td>
                                        <td><input type="text" id="metakeywords" name="metakeywords" value="${cupcake.metakeywords}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="metadescription">Meta Description:</label></td>
                                        <td><input type="text" id="metadescription" name="metadescription" value="${cupcake.metadescription}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="url_code">URL:</label></td>
                                        <td><input type="text" id="url_code" name="url_code" value="${cupcake.url_code}" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="image_cupcake">Изображение:</label></td>
                                        <td><input type="file" id="image_cupcake" name="image_cuocake"></td>
                                    </tr>
                                    <tr>
                                        <td><label for="content">Контент:</label></td>
                                        <td><textarea id="content" name="content" required>${cupcake.content}</textarea></td>
                                    </tr>
                                    <tr>
                                    <td colspan="2">
                                        <button type="submit">Сохранить</button>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                `;
                document.getElementById('cupcake-form').onsubmit = async function (event) {
                    event.preventDefault();
                    const formData = new FormData();
                    formData.append('header', document.getElementById('header').value);
                    formData.append('metakeywords', document.getElementById('metakeywords').value);
                    formData.append('metadescription', document.getElementById('metadescription').value);
                    formData.append('url_code', document.getElementById('url_code').value);
                    formData.append('image_cupcake', document.getElementById('image_cupcake').files[0]);
                    formData.append('content', document.getElementById('content').value);

                    try {
                        const response = await fetch(`/admin/cupcakes/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                'Role': localStorage.getItem('role'),
                            },
                            body: formData
                        })

                        if (response.ok) {
                            const data = await response.json();
                            alert('Капкейки успешно обновлены');
                            window.location.reload();
                        } else {
                            const errorData = await response.json();
                            alert(errorData.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            } else {
                console.error('Ошибка при получении данных:', data);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    window.deleteUser = async function (id) {
        try {
            const response = await fetch(`/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Role': localStorage.getItem('role'),
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert('Пользователь успешно удален');
                loadUsers();
            } else {
                alert('Произошла ошибка при удалении пользователя');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    window.deleteCake = async function (id) {
        try {
            const response = await fetch(`/admin/cakes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Role': localStorage.getItem('role'),
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert('Торт успешно удален');
                loadCakes();
            } else {
                alert('Произошла ошибка при удалении торта');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    window.deleteCupcake = async function (id) {
        try {
            const response = await fetch(`/admin/cupcakes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Role': localStorage.getItem('role'),
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert('Капкейк успешно удален');
                loadCupcakes();
            } else {
                alert('Произошла ошибка при удалении капкейки');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    document.getElementById('users-tab').onclick = loadUsers;
    document.getElementById('cakes-tab').onclick = loadCakes;
    document.getElementById('cupcakes-tab').onclick = loadCupcakes;

});

