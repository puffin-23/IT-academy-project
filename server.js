const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');

const { logLine, reportServerError, reportRequestError, arrayToHash, verifyToken } = require('./utils');
const { newConnectionFactory, selectQueryFactory } = require("./utils_db");
const {
    composeMaket_IndPage_Main,
    composeMaket_IndPage_Login,
    composeMaket_IndPage_Cakes,
    composeMaket_IndPage_Cupcakes,
    composeMaket_Cake,
    composeMaket_Cupcake
} = require("./makets");

//Конфигурация для пула соединений
const poolCinfig = {
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'it-academy-project'
}

const pool = mysql.createPool(poolCinfig);

const PORT = 8581;
const logFN = path.join(__dirname, '_server.log');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')));//Расдача статики(изображения, стили и т.д.)
app.use('/cake/static', express.static(path.join(__dirname, 'static')));
app.use('/cupcake/static', express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Настройка Sequelize
const sequelize = new Sequelize('it-academy-project', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

//Модель пользователя
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

//Инициализация БД
sequelize.sync();

app.get('/', async (req, res, next) => {
    req.url = '/main';
    next();
});

// УРЛы вида /urlcode
app.get('/:urlcode', async (req, res) => {

    let pageUrlCode = req.params.urlcode;
    logLine(logFN, 'вид страницы: индивидуальная, urlcode=' + pageUrlCode);

    let connection = null;
    try {
        connection = await newConnectionFactory(pool, res);
        logLine(logFN, 'соединение с БД установлено');

        let indPages = await selectQueryFactory(connection, `
           select title, content, metakeywords, metadescription
           from indpages
           where url_code=?
       ;`, [pageUrlCode]);

        if (indPages.length !== 1) {
            logLine(logFN, "индивидуальная страница не найдена, urlcode=" + pageUrlCode);
            res.status(404).send("Извините, такой страницы у нас нет!");
        }
        else {

            // Некоторым блокам потребуется содержимое таблицы настроек
            let optionsArr = await selectQueryFactory(connection, `select * from options;`, []);
            let options = arrayToHash(optionsArr, 'code');
            logLine(logFN, 'содержимое таблицы настроек получено' + JSON.stringify(options));

            // Для разных индивидуальных страниц используются разные макеты
            switch (pageUrlCode) {
                case 'main': {
                    let html = await composeMaket_IndPage_Main( // вызываем построение макета индивидуальной страницы /main
                        { connection, logFN },
                        { // данные приложения
                            indPageInfo: indPages[0], // информация о индивидуальной странице
                            options, // настройки сайта
                        }
                    );
                    console.log('html from composeMaket_IndPage_Main:', html);

                    res.send(html);
                } break;
                case 'cakes': {
                    let html = await composeMaket_IndPage_Cakes( // вызываем построение макета индивидуальной страницы /cakes
                        { connection, logFN },
                        { // данные приложения
                            indPageInfo: indPages[0], // информация о индивидуальной странице
                            options, // настройки сайта
                        }
                    );
                    console.log('html from composeMaket_IndPage_Cakes:', html);

                    res.send(html);
                } break;
                case 'cupcakes': {
                    let html = await composeMaket_IndPage_Cupcakes( // вызываем построение макета индивидуальной страницы /cupcakes
                        { connection, logFN },
                        { // данные приложения
                            indPageInfo: indPages[0], // информация о индивидуальной странице
                            options, // настройки сайта
                        }
                    );
                    console.log('html from composeMaket_IndPage_Cupcakes:', html);

                    res.send(html);
                } break;
                case 'login': {
                    let html = await composeMaket_IndPage_Login( // вызываем построение макета индивидуальной страницы /login
                        { connection, logFN },
                        { // данные приложения
                            indPageInfo: indPages[0], // информация о индивидуальной странице
                            options, // настройки сайта
                        }
                    );
                    console.log('html from composeMaket_IndPage_Login:', html);

                    res.send(html);
                } break;
                case 'admin': { // переход на административный интерфейс
                } break;
                default: {
                    logLine(logFN, "неизвестная индивидуальная страница, urlcode=" + pageUrlCode);
                    res.status(404).send("Извините, такой страницы у нас нет!");
                }
            }
        }
    }
    catch (error) {
        reportServerError(error.stack, res, logFN);
    }
    finally {
        if (connection)
            connection.release();
    }

});

// УРЛы вида /cake/urlcode
app.get('/cake/:urlcode', async (req, res) => {
    let cakeUrlCode = req.params.urlcode;
    logLine(logFN, 'вид страницы: торт, urlcode=' + cakeUrlCode);

    let connection = null;
    try {
        connection = await newConnectionFactory(pool, res);

        let cakes = await selectQueryFactory(connection, `
            select header, content, metakeywords, metadescription, image_cake
            from cakes
            where url_code=?
        ;`, [cakeUrlCode]);

        if (cakes.length !== 1) {
            logLine(logFN, "торт не найден, urlcode=" + cakeUrlCode);
            res.status(404).send("Извините, такого торта у нас нет!");
        }
        else {

            // Некоторым блокам потребуется содержимое таблицы настроек
            let optionsArr = await selectQueryFactory(connection, `select * from options;`, []);
            let options = arrayToHash(optionsArr, 'code');

            // все торты рендерим по "макету одного торта"
            let html = await composeMaket_Cake( // вызываем построение макета одного торта
                { // служебные параметры
                    connection, // соединение с БД - мы полагаем, что макету потребуется делать свои операции с БД
                    logFN, // имя файла лога - мы полагаем, что макету потребуется что-то записать в лог
                },
                { // данные приложения
                    cakeInfo: cakes[0], // информация о торте из УРЛа - мы полагаем, что в макете будет блок "торт из УРЛа" и ему нужна эта информация
                    options, // настройки сайта
                }
            );
            res.send(html);
        }
    }
    catch (error) {
        reportServerError(error.stack, res, logFN);
    }
    finally {
        if (connection)
            connection.release();
    }

});

// УРЛы вида /cupcake/urlcode
app.get('/cupcake/:urlcode', async (req, res) => {
    let cupcakeUrlCode = req.params.urlcode;
    logLine(logFN, 'вид страницы: капкейки, urlcode=' + cupcakeUrlCode);

    let connection = null;
    try {
        connection = await newConnectionFactory(pool, res);

        let cupcakes = await selectQueryFactory(connection, `
            select header, content, metakeywords, metadescription, image_cupcake
            from cupcakes
            where url_code=?
        ;`, [cupcakeUrlCode]);

        if (cupcakes.length !== 1) {
            logLine(logFN, "торт не найден, urlcode=" + cupcakeUrlCode);
            res.status(404).send("Извините, таких капкейков у нас нет!");
        }
        else {

            // Некоторым блокам потребуется содержимое таблицы настроек
            let optionsArr = await selectQueryFactory(connection, `select * from options;`, []);
            let options = arrayToHash(optionsArr, 'code');

            // все торты рендерим по "макету одного вида капкейков"
            let html = await composeMaket_Cupcake( // вызываем построение макета одного вида капкейков
                { // служебные параметры
                    connection, // соединение с БД - мы полагаем, что макету потребуется делать свои операции с БД
                    logFN, // имя файла лога - мы полагаем, что макету потребуется что-то записать в лог
                },
                { // данные приложения
                    cupcakeInfo: cupcakes[0], // информация о капкейках из УРЛа - мы полагаем, что в макете будет блок "капкейки из УРЛа" и ему нужна эта информация
                    options, // настройки сайта
                }
            );
            res.send(html);
        }
    }
    catch (error) {
        reportServerError(error.stack, res, logFN);
    }
    finally {
        if (connection)
            connection.release();
    }

});

//Middleware для регистрации пользователя с хэшированным паролем
app.post('/register', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username: username,
            password: hashedPassword,
            role: 'user'
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: user });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

//Middleware для аутентификации пользователя
app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = await User.findOne({ where: { username: username } });

    if (user && (await bcrypt.compare(password, user.password))) {
        if (user.role === 'admin') {
            const token = jwt.sign({ id: user.id, role: 'admin' }, 'secretKey');
            res.status(200).json({ message: 'Авторизация прошла успешно', token: token });
        } else {
            const token = jwt.sign({ id: user.id, role: 'user' }, 'secretKey');
            res.status(200).json({ message: 'Авторизация прошла успешно', token: token });
        }
    } else {
        res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }
})




app.listen(PORT, () => {
    console.log('Сервер запущен на порту ' + PORT);
});