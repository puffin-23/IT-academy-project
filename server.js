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


const { logLine, arrayToHash, compressImage, scanDirectory } = require('./utils');
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
const { error } = require('console');


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
        cb(null, originalName)
    }
});

const upload = multer({ storage: storage })

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => {
    try {
        req.url = '/main';
        next();
    } catch (error) {
        logLine(logFN, error.message);
        res.status(500).send(error.message);
    }
});

// УРЛы вида /urlcode
app.get('/:urlcode', async (req, res) => {
    let pageUrlCode = req.params.urlcode;
    logLine(logFN, 'Page urlcode, urlcode=' + pageUrlCode);

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
            logLine(logFN, "Page not found, urlcode=" + pageUrlCode);
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
                    )
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
                    res.send(html);
                } break;
                default: {
                    logLine(logFN, "Page not found, urlcode=" + pageUrlCode);
                    res.status(404).send("Извините, такой страницы у нас нет!");
                }
            }
        }
    }
    catch (error) {
        logLine(logFN, 'Error when getting page' + { 'error': error.message });
        res.status(500).send('Error when getting page');
    }
    finally {
        if (connection)
            connection.release();
    }

});

// УРЛы вида /cake/urlcode
app.get('/cake/:urlcode', async (req, res) => {
    let cakeUrlCode = req.params.urlcode;
    logLine(logFN, 'Page of cake, urlcode=' + cakeUrlCode);

    let connection = null;
    try {
        connection = await newConnectionFactory(pool, res);

        let cakes = await selectQueryFactory(connection, `
            select header, content, metakeywords, metadescription, image_cake
            from cakes
            where url_code=?
        ;`, [cakeUrlCode]);

        if (cakes.length !== 1) {
            logLine(logFN, "Cake not found, urlcode=" + cakeUrlCode);
            res.status(404).send("Извините, такого торта у нас нет!");
        }
        else {
            let optionsArr = await selectQueryFactory(connection, `select * from options;`, []);
            let options = arrayToHash(optionsArr, 'code');

            let html = await composeMaket_Cake( 
                { 
                    connection, 
                    logFN, 
                },
                { 
                    cakeInfo: cakes[0], 
                    options,
                }
            );
            res.send(html);
        }
    }
    catch (error) {
        logLine(logFN, 'Error when getting cake' + { 'error': error.message });
        res.status(500).send('Error when getting cake');
    }
    finally {
        if (connection)
            connection.release();
    }

});

// УРЛы вида /cupcake/urlcode
app.get('/cupcake/:urlcode', async (req, res) => {
    let cupcakeUrlCode = req.params.urlcode;
    logLine(logFN, 'Page of cupcake, urlcode=' + cupcakeUrlCode);

    let connection = null;
    try {
        connection = await newConnectionFactory(pool, res);

        let cupcakes = await selectQueryFactory(connection, `
            select header, content, metakeywords, metadescription, image_cupcake
            from cupcakes
            where url_code=?
        ;`, [cupcakeUrlCode]);

        if (cupcakes.length !== 1) {
            logLine(logFN, "Cupcake not found, urlcode=" + cupcakeUrlCode);
            res.status(404).send("Извините, таких капкейков у нас нет!");
        }
        else {
            let optionsArr = await selectQueryFactory(connection, `select * from options;`, []);
            let options = arrayToHash(optionsArr, 'code');

            let html = await composeMaket_Cupcake( 
                { 
                    connection, 
                    logFN, 
                },
                { 
                    cupcakeInfo: cupcakes[0], 
                    options, 
                }
            );
            res.send(html);
        }
    }
    catch (error) {
        logLine(logFN, 'Error when getting cupcake' + { 'error': error.message });
        res.status(500).send('Error when getting cupcake');
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

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', username });
    } catch (error) {
        logLine(logFN, 'Error when registering user' + { 'error': error.message });
        res.status(500).send('Error when registering user');
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
        const salt = 'ng459g3n374cv57m0457c57nc2306puffin'
        const resultToken = token + salt

        try {
            await Token.create({
                user_id: user.id,
                token: resultToken,
                created_at: new Date(),
                expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24),
                user_role: role
            });
            res.status(200).json({ message: 'Авторизация прошла успешно', token: token, role: role });
        } catch (error) {
            logLine(logFN, 'Error when creating token' + { 'error': error.message });
            res.status(500).send('Error when creating token');
        }
    } else {
        logLine(logFN, 'Invalid username or password');
        res.status(401).send('Invalid username or password');
    }
})

app.get('/admin', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied');
            return res.status().json({ message: 'Access denied' });
        }
    }
})
//Middleware списка пользователей
app.get('/admin/users', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
            try {
                const users = await User.findAll();
                res.json(users);
            } catch (error) {
                logLine(logFN, 'Users not found' + error.message);
                res.status(500).send('Users not found');
            }
        }
    }
});

app.get('/admin/users/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
            try {
                const id = req.params.id;
                const user = await User.findByPk(id);
                res.json(user);
            } catch (error) {
                logLine(logFN, 'User not found' + error.message);
                res.status(500).send('User not found');
            }
        }
    }
})

app.put('/admin/users/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
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
                    logLine(logFN, 'User not found' + error.message);
                    res.status(404).send('User not found');
                }
            } catch (error) {
                logLine(logFN, 'User not found' + error.message);
                res.status(500).send('User not found');
            }
        }
    }
})

app.delete('/admin/users/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
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
                    logLine(logFN, 'User not found' + error.message);
                    res.status(404).send('User not found');
                }
            } catch (error) {
                logLine(logFN, 'User not found' + error.message);
                res.status(500).send('User not found');
            }
        }
    }
}
)

//Middleware для тортов
app.get('/admin/cakes', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
            try {
                const cakes = await Cake.findAll({
                    include: {
                        model: Contents_blocks,
                        attributes: ['block_attributes']
                    }
                });

                if (!cakes) {
                    logLine(logFN, 'Cakes not found' + error.message);
                    return res.status(404).send('Cakes not found');
                }

                const result = cakes.map(cake => ({
                    id: cake.id,
                    header: cake.header,
                    image_cake: cake.image_cake,
                    content: JSON.parse(cake.content),
                    url_code: cake.url_code,
                    metakeywords: cake.metakeywords,
                    metadescription: cake.metadescription,
                }))

                res.json(result);
            } catch (error) {
                logLine(logFN, 'Cakes not found' + error.message);
                res.status(500).send('Cakes not found');
            }
        }
    }
})

app.get('/admin/cakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied');
            return res.status(401).json({ message: 'Access denied' });
        } else {
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
                logLine(logFN, 'Cake not found' + { 'error': error.message });
                res.status(500).send('Cake not found');
            }
        }
    }
})

app.put('/admin/cakes/:id', upload.single('image_cake'), async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
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
                            const compressedFilePath = filePath + '_compressed.PNG';
                            await compressImage(filePath, compressedFilePath);
                            fsPromises.unlink(filePath);
                        }
                    }
                } catch (error) {
                    logLine(logFN, 'Error when scanning directory' + { 'error': error.message });
                }

                const oldCake = await Cake.findByPk(req.params.id);
                const oldImage = oldCake.image_cake;
                if (oldImage) {
                    const oldImagePath = path.join(__dirname, oldImage);
                    if (fs.existsSync(oldImagePath)) {
                        await fsPromises.unlink(oldImagePath);
                    }
                } else {
                    logLine(logFN, 'Old image not found' + error.message);
                }

                const id = req.params.id;
                const header = req.body.header;
                const url_code = req.body.url_code;
                const contentText = req.body.content;
                const metakeywords = req.body.metakeywords;
                const metadescription = req.body.metadescription;

                const cake = await Cake.findByPk(id);
                if (!cake) {
                    logLine(logFN, 'Cake not found' + error.message);
                    return res.status(404).send('Cake not found');
                }
                const contentNumber = cake.content

                const contentBlock = await Contents_blocks.findOne({
                    where: {
                        content: contentNumber // используем номер контента из поля content
                    }
                });
                if (!contentBlock) {
                    logLine(logFN, 'Content block not found' + error.message);
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
                logLine(logFN, 'Error when updating cake' + { 'error': error.message });
                res.status(500).send('Error when updating cake');
            }
        }
    }
})

app.delete('/admin/cakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
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
                    logLine(logFN, 'Cake not found' + error.message);
                    res.status(404).send('Cake not found');
                }
            } catch (error) {
                logLine(logFN, 'Cake not found' + error.message);
                res.status(500).send('Cake not found');
            }
        }
    }
})

//Middleware для получения списка капкейков
app.get('/admin/cupcakes', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
            try {
                const cupcakes = await Cupcake.findAll();
                console.log('cakes', cupcakes);
                res.json(cupcakes);
            } catch (error) {
                logLine(logFN, 'Cupcakes not found' + error.message);
                res.status(404).send('Cupcakes not found');
            }
        }
    }
});

app.get('/admin/cupcakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
            try {
                const id = req.params.id;
                const cupcake = await Cupcake.findByPk(id);
                if (!cupcake) {
                    logLine(logFN, 'Cupcake not found' + error.message);
                    return res.status(404).send('Cupcake not found');
                }
                const contentBlock = await Contents_blocks.findOne({
                    where: {
                        content: cupcake.content // используем номер контента из поля content
                    }
                });
                if (!contentBlock) {
                    logLine(logFN, 'Content block not found' + error.message);
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
                logLine(logFN, 'Cupcake not found' + error.message);
                res.status(404).send('Cupcake not found');
            }
        }
    }
})

app.put('/admin/cupcakes/:id', upload.single('image_cupcake'), async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
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
                            const compressedFilePath = filePath + '_compressed.PNG';
                            await compressImage(filePath, compressedFilePath);
                            fsPromises.unlink(filePath);
                        }
                    }
                } catch (error) {
                    logLine(logFN, 'Error when scanning directory' + { 'error': error.message });
                }

                const oldCupcake = await Cupcake.findByPk(req.params.id);
                const oldImage = oldCupcake.image_cupcake;
                if (oldImage) {
                    const oldFilePath = path.join(__dirname, oldImage);
                    if (fs.existsSync(oldFilePath)) {
                        await fsPromises.unlink(oldFilePath);
                    }
                } else {
                    logLine(logFN, 'Old image not found' + error.message);
                }

                const id = req.params.id;
                const header = req.body.header;
                const url_code = req.body.url_code;
                const contentText = req.body.content;
                const metakeywords = req.body.metakeywords;
                const metadescription = req.body.metadescription;

                const cupcake = await Cupcake.findByPk(id);
                if (!cupcake) {
                    logLine(logFN, 'Cupcake not found' + error.message);
                    return res.status(404).send('Cupcake not found');
                }
                const contentNumber = cupcake.content

                const contentBlock = await Contents_blocks.findOne({
                    where: {
                        content: contentNumber // используем номер контента из поля content
                    }
                });
                if (!contentBlock) {
                    logLine(logFN, 'Content block not found' + error.message);
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
                logLine(logFN, 'Cupcake not found' + { 'error': error.message });
                res.status(500).send('Cupcake not found');
            }
        }
    }
})

//Middleware для удаления капкейка
app.delete('/admin/cupcakes/:id', async (req, res) => {
    if (!req.headers.authorization) {
        logLine(logFN, 'Unauthorized' + error.message);
        return res.status(401).send('Unauthorized');
    } else if (req.headers.authorization) {
        if (req.headers.role !== 'admin') {
            logLine(logFN, 'Access denied' + error.message);
            return res.status(401).send('Access denied');
        } else {
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
                    logLine(logFN, 'Cupcake not found' + error.message);
                    res.status(404).send('Cupcake not found');
                }
            } catch (error) {
                logLine(logFN, 'Cupcake not found' + error.message);
                res.status(500).send('Cupcake not found');
            }
        }
    }
})




//Инициализация БД
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Сервер запущен на порту ' + PORT);
    });
}).catch(err => {
    logLine(logFN, 'Erorr when initializing DB' + { 'error': err.message });
});
