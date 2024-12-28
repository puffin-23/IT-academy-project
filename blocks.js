const { processText } = require('./utils');
const { selectQueryRowFactory, selectQueryFactory } = require("./utils_db");
const { composeContent } = require("./contents");

// каждый блок возвращает свой html, скомпонованный прямо строковыми операциями
// для сложной вёрстки это может быть неудобно
// в примере 4542 показано, как использовать например handlebars для рендера шаблона в строку
// сложные блоки могут действовать схожим образом

async function composeBlock_Header(coreData, appData, blockAttributes) {
    return `<nav>${blockAttributes.text}</nav>`;
}

async function composeBlock_SitesName(coreData, appData, blockAttributes) {
    let text = blockAttributes.text;
    text = processText(text, appData);
    return `<div class='logo-text'>${text}</div>`;
}

async function composeBlock_FormattedText(coreData, appData, blockAttributes) {
    let text = blockAttributes.text;
    text = processText(text, appData);
    return `<div>${text}</div>`;
}

async function composeBlock_Search(coreData, appData, blockAttributes) {
    return `<input class="search-input" type="text" value='Найти...'>`;
}

async function composeBlock_ButtonToSearch(coreData, appData, blockAttributes) {
    return `<button type="button" class="search-button">Поиск</button>`;
}

async function composeBlock_Image(coreData, appData, blockAttributes) {

    const imageId = blockAttributes.image;
    if (!imageId)
        return "";

    let imageRow = await selectQueryRowFactory(coreData.connection, `
        select url
        from images
        where id=?
    ;`, [imageId]);

    return `<img src='${imageRow.url}' style='display: block; max-width: 400px'>`;
}

async function composeBlock_ImageLogo(coreData, appData, blockAttributes) {

    const imageId = blockAttributes.image;
    if (!imageId)
        return "";

    let imageRow = await selectQueryRowFactory(coreData.connection, `
        select url
        from images
        where id=?
    ;`, [imageId]);

    return `<img src="${imageRow.url}" alt='Логотип' class='logo-img'>`;
}

async function composeBlock_Contacts(coreData, appData, blockAttributes) {
    let text = blockAttributes.text;
    text = processText(text, appData);
    return `<div>Наш инстаграм: ${text}</div>`;
}

async function composeBlock_LinkToMainPage(coreData, appData, blockAttributes) {
    return `<a href='/'>${blockAttributes.text}</a>`;
}

async function composeBlock_ButtonToBasket(coreData, appData, blockAttributes) {
    return `<div><button class="basket-button" type="submit" onclick="location.href='/basket'">${blockAttributes.text}</button></div>`;
}

async function composeBlock_ButtonToLogin(coreData, appData, blockAttributes) {
    return `<div><button class="login-button" type="submit" onclick="location.href='/login'">${blockAttributes.text}</button></div>`;
}


async function composeBlock_URLCake_Header(coreData, appData, blockAttributes) {
    return `
    <h2>${appData.cakeInfo.header}</h2>\n`;
}

async function composeBlock_URLCake_Text(coreData, appData, blockAttributes) {
    const HTMLs = await composeContent(appData.cakeInfo.content, coreData, appData);
    return `<div class="cake-details">\n
    <img src="${appData.cakeInfo.image_cake}" alt="${appData.cakeInfo.header}">\n
    <div class="cake-description">${HTMLs.join("\n")}</div>\n
    <a href="#" class="order-button">Заказать</a>\n
    </div>\n`;
}

async function composeBlock_URLCupcake_Header(coreData, appData, blockAttributes) {
    return `
    <h2>${appData.cupcakeInfo.header}</h2>\n`;
}

async function composeBlock_URLCupcake_Text(coreData, appData, blockAttributes) {
    const HTMLs = await composeContent(appData.cupcakeInfo.content, coreData, appData);
    return `<div class="cupcake-details">\n
    <img src="${appData.cupcakeInfo.image_cupcake}" alt="${appData.cupcakeInfo.header}">\n
    <div class="cupcake-description">${HTMLs.join("\n")}</div>\n
    <a href="#" class="order-button">Заказать</a>\n
    </div>\n`;
}

async function composeBlock_URLIndPage_Text(coreData, appData, blockAttributes) {
    const HTMLs = await composeContent(appData.indPageInfo.content, coreData, appData);
    return HTMLs.join("\n");
}

async function composeBlock_Container_LtR(coreData, appData, blockAttributes) {
    const HTMLs = await composeContent(blockAttributes.content, coreData, appData);
    return `
${HTMLs.map( html => `${html}` ).join("\n")}  
    `;
}

async function composeBlock_Menu(coreData, appData, blockAttributes) {
    const HTML1s = await composeContent(blockAttributes.content1, coreData, appData);
    console.log('HTML1s', HTML1s);
    
    const HTML2s = await composeContent(blockAttributes.content2, coreData, appData);
    console.log('HTML2s', HTML2s);
    return `<div class=menu>\n
                <div class=circle onclick="location.href='/cakes'">\n
                <img src='/static/menu_cakes.PNG' alt="Торты">\n
                    ${HTML1s.join("\n")}</div>\n
                <div class=circle onclick="location.href='/cupcakes'">
                <img src='/static/menu_cupcakes.PNG' alt="Капкейки">\n
                    ${HTML2s.join("\n")}</div>\n 
            </div>\n`;
}

async function composeBlock_LinkToCakes(coreData, appData, blockAttributes) {

    return blockAttributes.text;
}

async function composeBlock_LinkToCupcakes(coreData, appData, blockAttributes) {
    
    return blockAttributes.text;   
}

async function composeBlock_FormToLogin(coreData, appData, blockAttributes) {
    return `<div class="login-container">\n
    <h2>${blockAttributes.text}</h2>\n
    <form id="login-form">\n
        <div class="input-group">\n
            <label for="username">Username:</label>\n
            <input type="username" id="username" name="username" required>\n
        </div>\n
        <div class="input-group">\n
            <label for="password">Пароль:</label>\n
            <input type="password" id="password" name="password" required>\n
        </div>\n
        <div class="button-group">\n
            <button type="submit">Вход</button>\n
            <button type="button" onclick="register()">Регистрация</button>\n
        </div>
    </form>
    </div>\n
    <script src="/static/login.js"></script>\n`
}

async function composeBlock_CakesList(coreData, appData, blockAttributes) {
    let cakes=await selectQueryFactory(coreData.connection, `
        select url_code, header, image_cake
        from cakes
    ;`, []);

    return `<div class="cakes-container">\n
    ${cakes.map( cake => `<div class="cake-item"><img src="${cake.image_cake}"> <a href="/cake/${cake.url_code}">${cake.header}</a></div>`).join("\n")}
    </div>\n`;
}

async function composeBlock_CupcakesList(coreData, appData, blockAttributes) {
    let cupcakes=await selectQueryFactory(coreData.connection, `
        select url_code, header, image_cupcake
        from cupcakes
    ;`, []);

    return `<div class="cupcakes-container">\n
    ${cupcakes.map( cupcake => `<div class="cupcake-item"><img src="${cupcake.image_cupcake}"> <a href="/cupcake/${cupcake.url_code}">${cupcake.header}</a></div>`).join("\n")}
    </div>\n`;
}



module.exports = {
    composeBlock_Header, composeBlock_FormattedText,
    composeBlock_SitesName,
    composeBlock_ImageLogo,
    composeBlock_LinkToMainPage,
    composeBlock_Search,
    composeBlock_Image,
    composeBlock_Contacts,
    composeBlock_ButtonToSearch,
    composeBlock_ButtonToBasket,
    composeBlock_ButtonToLogin,
    composeBlock_LinkToCakes, composeBlock_LinkToCupcakes,
    composeBlock_FormToLogin,
    composeBlock_CakesList,
    composeBlock_CupcakesList,
    composeBlock_URLCake_Header, composeBlock_URLCake_Text,
    composeBlock_URLCupcake_Header, composeBlock_URLCupcake_Text,
    composeBlock_URLIndPage_Text,
    composeBlock_Container_LtR, composeBlock_Menu,
};
