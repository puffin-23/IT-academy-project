const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const fsPromises = fs.promises;

const { logLine, reportServerError, reportRequestError, arrayToHash, compressImage, scanDirectory } = require('./utils');
const { newConnectionFactory, selectQueryFactory } = require("./utils_db");
const {
    composeMaket_IndPage_Main,
    composeMaket_IndPage_Login,
    composeMaket_IndPage_Cakes,
    composeMaket_IndPage_Cupcakes,
    composeMaket_Cake,
    composeMaket_Cupcake,
    composeMaket_IndPage_Admin,
} = require("./makets");
const { User, Contents_blocks, Cake, Cupcake, Token } = require('./models');


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


const sequelize = new Sequelize('it-academy-project', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const PORT = 8581;
const logFN = path.join(__dirname, '_server.log');
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, path.join(__dirname, 'static'));

        
    },      
    filename: (req, file, cb) => {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8')

        cb(null, originalName);
        
    }
});

const upload = multer({ storage: storage })

const app = express();

//Расдача статики(изображения, стили и т.д.)
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/cake/static', express.static(path.join(__dirname, 'static')));
app.use('/cupcake/static', express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/admin', express.static(path.join(__dirname, 'static')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

                    let html = await composeMaket_IndPage_Admin( // вызываем построение макета индивидуальной страницы /admin
                        { connection, logFN },
                        { // данные приложения
                            indPageInfo: indPages[0], // информация о индивидуальной странице
                            options, // настройки сайта
                        }
                    );
                    console.log('html from composeMaket_IndPage_Admin:', html);

                    res.send(html);
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
        const role = user.role;

        const token = jwt.sign({ id: user.id }, 'secretKey');

        try {
            await Token.create({
                user_id: user.id,
                token: token,
                created_at: new Date(),
                expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24),
                user_role: role
            });
            res.status(200).json({ message: 'Авторизация прошла успешно', token: token, role: role });
        } catch (error) {
            res.status(400).json({ error: err.message });
        }


    } else {
        res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }
})

//Middleware списка пользователей
app.get('/admin/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/admin/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.json(user);
})

app.put('/admin/users/:id', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        const id = req.params.id;
        const username = req.body.username;
        const role = req.body.role;

        const user = await User.update({
            username: username,
            role: role
        }, {
            where: {
                id: id
            }
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
})

app.delete('/admin/users/:id', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        const id = req.params.id;
        const user = await User.destroy({
            where: {
                id: id
            }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}
)

//Middleware для тортов
app.get('/admin/cakes', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        } else {
            try {
                const cakes = await Cake.findAll({
                    include: { 
                        model: Contents_blocks, 
                        attributes: ['block_attributes']
                     }
                });
                
                const result = cakes.map(cake => ({
                    id: cake.id,
                    header: cake.header,
                    image_cake: cake.image_cake,
                    content: JSON.parse(cake.content),
                    url_code: cake.url_code,
                    metakeywords: cake.metakeywords,
                    metadescription: cake.metadescription,
                }))
                    console.log('cakes', result);
                res.json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ 'error': error.message });
            }
        }
    }
})

app.get('/admin/cakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        const id = req.params.id;
        const cake = await Cake.findByPk(id);
        if (!cake) {
            return res.status(404).send('Cake not found');
        }
        const contentBlock = await Contents_blocks.findOne({
            where: {
                content: cake.content // используем номер контента из поля content
            }
        });
        if (!contentBlock) {
            return res.status(404).send('Content block not found');
        }
        res.json({
            id: cake.id,
            header: cake.header,
            content: contentBlock.block_attributes,
            url_code: cake.url_code,
            metakeywords: cake.metakeywords,
            metadescription: cake.metadescription,
            image_cake: cake.image_cake
        });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
})

app.put('/admin/cakes/:id', upload.single('image_cake'), async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        try {
            const directoryPath = path.join(__dirname, 'static');
            const files = await fsPromises.readdir(directoryPath, { withFileTypes: true });
            for (const file of files) {
                const filePath = path.join(directoryPath, file.name);
                const stats = await fsPromises.stat(filePath);

                if (stats.isDirectory()) {
                    await scanDirectory(filePath);
                } else if (stats.isFile() && file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png')) {
                    console.log('Сжимаем файл', filePath);
                    const compressedFilePath = filePath + '_compressed.PNG';
                    await compressImage(filePath, compressedFilePath);
                    fsPromises.unlink(filePath);
                }
            }
        } catch (error) {
            console.error('Ошибка при сканировании директории:', error);
        }

        const oldCake = await Cake.findByPk(req.params.id);
        const oldImage = oldCake.image_cake; 
        if (oldImage) {
            const oldImagePath = path.join(__dirname, oldImage);
            if (fs.existsSync(oldImagePath)) {
                await fsPromises.unlink(oldImagePath);
            }
        } else {
            console.log('Старое изображение не найдено');
        }

        const id = req.params.id;
        const header = req.body.header;
        const url_code = req.body.url_code;
        const contentText = req.body.content;
        const metakeywords = req.body.metakeywords;
        const metadescription = req.body.metadescription;

        const cake = await Cake.findByPk(id);
        if (!cake) {
            return res.status(404).send('Cake not found');
        }
        const contentNumber = cake.content

        const contentBlock = await Contents_blocks.findOne({
            where: {
                content: contentNumber // используем номер контента из поля content
            }
        });
        if (!contentBlock) {
            return res.status(404).send('Content block not found');
        }

        contentBlock.block_attributes = contentText;
        await contentBlock.save();

        cake.header = header;
        cake.url_code = url_code;
        cake.metakeywords = metakeywords;
        cake.metadescription = metadescription;
        if (req.file) {
            cake.image_cake = '/static/' + req.file.filename + '_compressed.PNG';
        }
        await cake.save();

        res.json(cake);
    } catch (error) {
        res.status(500).json({ 'error': error.message });
        }
})

//Middleware для удаления торта
app.delete('/admin/cakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        const id = req.params.id;
        const cake = await Cake.destroy({
            where: {
                id: id
            }
        });
        if (cake) {
            res.json(cake);
        } else {
            res.status(404).json({ message: 'Торт не найден' });
        }
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
})

//Middleware для получения списка капкейков
app.get('/admin/cupcakes', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        } else {
            try {
                const cupcakes = await Cupcake.findAll();
                console.log('cakes', cupcakes);
                res.json(cupcakes);
            } catch (error) {
                res.status(400).json({ 'error': error.message });
            }
        }
    }
});

app.get('/admin/cupcakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        const id = req.params.id;
        const cupcake = await Cupcake.findByPk(id);
        if (!cupcake) {
            return res.status(404).send('Cupcake not found');
        }
        const contentBlock = await Contents_blocks.findOne({
            where: {
                content: cupcake.content // используем номер контента из поля content
            }
        });
        if (!contentBlock) {
            return res.status(404).send('Content block not found');
        }
        res.json({
            id: cupcake.id,
            header: cupcake.header,
            content: contentBlock.block_attributes,
            url_code: cupcake.url_code,
            metakeywords: cupcake.metakeywords,
            metadescription: cupcake.metadescription,
            image_cake: cupcake.image_cupcake
        });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
})

app.put('/admin/cupcakes/:id', upload.single('image_cupcake'), async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        try {
            const directoryPath = path.join(__dirname, 'static');
            const files = await fsPromises.readdir(directoryPath, { withFileTypes: true });
            for (const file of files) {
                const filePath = path.join(directoryPath, file.name);
                const stats = await fsPromises.stat(filePath);

                if (stats.isDirectory()) {
                    await scanDirectory(filePath);
                } else if (stats.isFile() && file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png')) {
                    console.log('Сжимаем файл', filePath);
                    const compressedFilePath = filePath + '_compressed.PNG';
                    await compressImage(filePath, compressedFilePath);
                    fsPromises.unlink(filePath);
                }
            }
        } catch (error) {
            console.error('Ошибка при сканировании директории:', error);
        }

        const oldCupcake = await Cupcake.findByPk(req.params.id);
        const oldImage = oldCupcake.image_cupcake;
        if (oldImage) {
            const oldFilePath = path.join(__dirname, oldImage);
            if (fs.existsSync(oldFilePath)) {
                await fsPromises.unlink(oldFilePath); 
            }
        } else {
            console.log('Старое изображение не найден');
        }

        const id = req.params.id;
        const header = req.body.header;
        const url_code = req.body.url_code;
        const contentText = req.body.content;
        const metakeywords = req.body.metakeywords;
        const metadescription = req.body.metadescription;

        const cupcake = await Cupcake.findByPk(id);
        if (!cupcake) {
            return res.status(404).send('Cupcake not found');
        }
        const contentNumber = cupcake.content

        const contentBlock = await Contents_blocks.findOne({
            where: {
                content: contentNumber // используем номер контента из поля content
            }
        });
        if (!contentBlock) {
            return res.status(404).send('Content block not found');
        }

        contentBlock.block_attributes = contentText;
        await contentBlock.save();

        cupcake.header = header;
        cupcake.url_code = url_code;
        cupcake.metakeywords = metakeywords;
        cupcake.metadescription = metadescription;
        if (req.file) {
            cupcake.image_cupcake = '/static/' + req.file.filename + '_compressed.PNG';
        }
        await cupcake.save();

        res.json(cupcake);
    } catch (error) {
        res.status(500).json({ 'error': error.message });
        }
})

//Middleware для удаления капкейка
app.delete('/admin/cupcakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            return res.status().json({ message: 'Доступ запрещен' });
        }
    }
    try {
        const id = req.params.id;
        const cupcake = await Cupcake.destroy({
            where: {
                id: id
            }
        });
        if (cupcake) {
            res.json(cupcake);
        } else {
            res.status(404).json({ message: 'Капкейк не найден' });
        }
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
})

//Инициализация БД
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Сервер запущен на порту ' + PORT);
    });
}).catch(err => {
    console.log(err);
});
