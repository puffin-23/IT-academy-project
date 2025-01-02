const { composeContent } = require("./contents");

async function composeMaket_IndPage_Main(coreData, appData) {

    let html = "";

    html += `<html lang="ru">\n`;
    html += `<head>\n`;
    html += `<meta charset="utf-8">\n`;
    if (appData.indPageInfo.metakeywords)
        html += `<meta name="keywords" content="${appData.indPageInfo.metakeywords}"/>\n`;
    if (appData.indPageInfo.metadescription)
        html += `<meta name="description" content="${appData.indPageInfo.metadescription}"/>\n`;
    html += `<title>${appData.indPageInfo.title} - ${appData.options.SITENAME.str_value}</title>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `<link rel="stylesheet" href="static/styles.css">\n`;
    html += `</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs = await composeContent(22, coreData, appData); // в макете индивидуальной страницы в шапке - пусть будет всё тот же контент 22
    let footerContentHTMLs = await composeContent(33, coreData, appData); // в макете индивидуальной страницы в подвале - пусть будет всё тот же контент 33
    let urlIndPageContentHTMLs = await composeContent(55, coreData, appData); // в макете индивидуальной страницы в "содержимом страницы из УРЛа" - всегда контент 55

    html += `<header><div class="header-container">${headContentHTMLs.join("\n")}</div></header>\n`;
    html += `\n`;

    html += `<main class="main-container">${urlIndPageContentHTMLs.join("\n")}</main>\n`;
    html += `\n`;

    html += `<footer><div class="footer-container">${footerContentHTMLs.join("\n")}</div></footer>\n`;

    html += `</html>\n`;

    console.log('html:', html);


    return html;
}

async function composeMaket_IndPage_Login(coreData, appData) {

    let html = "";

    html += `<html lang="ru">\n`;
    html += `<head>\n`;
    html += `<meta charset="utf-8">\n`;
    if (appData.indPageInfo.metakeywords)
        html += `<meta name="keywords" content="${appData.indPageInfo.metakeywords}"/>\n`;
    if (appData.indPageInfo.metadescription)
        html += `<meta name="description" content="${appData.indPageInfo.metadescription}"/>\n`;
    html += `<title>${appData.indPageInfo.title} - ${appData.options.SITENAME.str_value}</title>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `<link rel="stylesheet" href="static/styles.css">\n`;
    html += `</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs = await composeContent(22, coreData, appData); // в макете индивидуальной страницы в шапке - пусть будет всё тот же контент 22
    let footerContentHTMLs = await composeContent(33, coreData, appData); // в макете индивидуальной страницы в подвале - пусть будет всё тот же контент 33
    let urlIndPageContentHTMLs = await composeContent(444, coreData, appData); // в макете индивидуальной страницы в "содержимом страницы из УРЛа" - всегда контент 55

    html += `<header><div class="header-container">${headContentHTMLs.join("\n")}</div></header>\n`;
    html += `\n`;

    html += `<main class="main-container">${urlIndPageContentHTMLs.join("\n")}</main>\n`;
    html += `\n`;

    html += `<footer><div class="footer-container">${footerContentHTMLs.join("\n")}</div></footer>\n`;

    html += `</html>\n`;

    console.log('html:', html);


    return html;
}

async function composeMaket_IndPage_Cakes(coreData, appData) {

    let html = "";

    html += `<html lang="ru">\n`;
    html += `<head>\n`;
    html += `<meta charset="utf-8">\n`;
    if (appData.indPageInfo.metakeywords)
        html += `<meta name="keywords" content="${appData.indPageInfo.metakeywords}"/>\n`;
    if (appData.indPageInfo.metadescription)
        html += `<meta name="description" content="${appData.indPageInfo.metadescription}"/>\n`;
    html += `<title>${appData.indPageInfo.title} - ${appData.options.SITENAME.str_value}</title>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `<link rel="stylesheet" href="static/styles.css">\n`;
    html += `</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs = await composeContent(22, coreData, appData); // в макете индивидуальной страницы в шапке - пусть будет всё тот же контент 22
    let footerContentHTMLs = await composeContent(33, coreData, appData); // в макете индивидуальной страницы в подвале - пусть будет всё тот же контент 33
    let urlIndPageContentHTMLs = await composeContent(222, coreData, appData); // в макете индивидуальной страницы в "содержимом страницы из УРЛа" - всегда контент 55

    html += `<header><div class="header-container">${headContentHTMLs.join("\n")}</div></header>\n`;
    html += `\n`;

    html += `<main class="main-container">${urlIndPageContentHTMLs.join("\n")}</main>\n`;
    html += `\n`;

    html += `<footer><div class="footer-container">${footerContentHTMLs.join("\n")}</div></footer>\n`;

    html += `</html>\n`;

    console.log('html:', html);


    return html;
}

async function composeMaket_IndPage_Cupcakes(coreData, appData) {

    let html = "";

    html += `<html lang="ru">\n`;
    html += `<head>\n`;
    html += `<meta charset="utf-8">\n`;
    if (appData.indPageInfo.metakeywords)
        html += `<meta name="keywords" content="${appData.indPageInfo.metakeywords}"/>\n`;
    if (appData.indPageInfo.metadescription)
        html += `<meta name="description" content="${appData.indPageInfo.metadescription}"/>\n`;
    html += `<title>${appData.indPageInfo.title} - ${appData.options.SITENAME.str_value}</title>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `<link rel="stylesheet" href="static/styles.css">\n`;
    html += `</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs = await composeContent(22, coreData, appData); // в макете индивидуальной страницы в шапке - пусть будет всё тот же контент 22
    let footerContentHTMLs = await composeContent(33, coreData, appData); // в макете индивидуальной страницы в подвале - пусть будет всё тот же контент 33
    let urlIndPageContentHTMLs = await composeContent(333, coreData, appData); // в макете индивидуальной страницы в "содержимом страницы из УРЛа" - всегда контент 55

    html += `<header><div class="header-container">${headContentHTMLs.join("\n")}</div></header>\n`;
    html += `\n`;

    html += `<main class="main-container">${urlIndPageContentHTMLs.join("\n")}</main>\n`;
    html += `\n`;

    html += `<footer><div class="footer-container">${footerContentHTMLs.join("\n")}</div></footer>\n`;

    html += `</html>\n`;

    console.log('html:', html);


    return html;
}

async function composeMaket_IndPage_Admin(coreData, appData) {

    let html = "";

    html += `<html lang="ru">\n`;
    html += `<head>\n`;
    html += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    html += `<meta charset="utf-8">\n`;
    html += `<title>Admin Panel</title>\n`;
    html += `<link rel="stylesheet" href="admin_styles.css">\n`;
    html += `<script defer src="admin.js"></script>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `</head>\n`;
    html += `<body>\n`;
    html += `<header>`
    html += `<nav>\n`;
    html += `<ul>\n
                <li><a href="#" id="users-tab">Пользователи</a></li>\n
                <li><a href="#" id="cakes-tab">Торты</a></li>\n
                <li><a href="#" id="cupcakes-tab">Капкейки</a></li>\n
            </ul>\n`;
    html += `<button id="login-button">Войти/Зарегистрироваться</button>`
    html += `</nav>\n`;
    html += `</header>\n`;
    html += `<main id="content-area">\n
         <h2>Выберите закладку для редактирования</h2>\n
    </main>\n`
    html += `</body>\n`;
    html += `</html>\n`;

    return html;
}

async function composeMaket_Cake(coreData,appData) {
    // надо построить МАКЕТ одного торта
    // по взятому нами определению термина "МАКЕТ", 
    // мы точно знаем, из каких визуальных частей свёрстан этот макет и точно знаем, "КОНТЕНТ" с каким идентификатором в каждой визуальной части надо отобразить
    // функция должна вернуть HTML-код, пригодный для отправки клиенту

    let html="";

    html+=`<html lang="ru">\n`;
    html+=`<head>\n`;
    if ( appData.cakeInfo.metakeywords )
        html+=`<meta name="keywords" content="${appData.cakeInfo.metakeywords}"/>\n`;
    if ( appData.cakeInfo.metadescription )
        html+=`<meta name="description" content="${appData.cakeInfo.metadescription}"/>\n`;
    html+=`<title>Торт - ${appData.cakeInfo.header} - ${appData.options.SITENAME.str_value}</title>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `<link rel="stylesheet" href="static/styles.css">\n`;
    html+=`</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs=await composeContent(22,coreData,appData); // мы точно знаем, что в макете одного торта в шапке - всегда контент 22
    let footerContentHTMLs=await composeContent(33,coreData,appData); // в макете одного торта в подвале - всегда контент 33
    let urlCakeContentHTMLs=await composeContent(44,coreData,appData); // в макете одного торта в "торт из УРЛа" - всегда контент 44

    html += `<header><div class="header-container">${headContentHTMLs.join("\n")}</div></header>\n`;
    html += `\n`;

    html += `<main class="main-container"><div class="cake-container">${urlCakeContentHTMLs.join("\n")}</div></main>\n`;
    html += `\n`;

    html += `<footer><div class="footer-container">${footerContentHTMLs.join("\n")}</div></footer>\n`;

    html += `</html>\n`;

    console.log('html:', html);


    return html;
}

async function composeMaket_Cupcake(coreData,appData) {
    // надо построить МАКЕТ одного вида капкейков
    // по взятому нами определению термина "МАКЕТ", 
    // мы точно знаем, из каких визуальных частей свёрстан этот макет и точно знаем, "КОНТЕНТ" с каким идентификатором в каждой визуальной части надо отобразить
    // функция должна вернуть HTML-код, пригодный для отправки клиенту

    let html="";

    html+=`<html lang="ru">\n`;
    html+=`<head>\n`;
    if ( appData.cupcakeInfo.metakeywords )
        html+=`<meta name="keywords" content="${appData.cupcakeInfo.metakeywords}"/>\n`;
    if ( appData.cupcakeInfo.metadescription )
        html+=`<meta name="description" content="${appData.cupcakeInfo.metadescription}"/>\n`;
    html+=`<title>Капкейки - ${appData.cupcakeInfo.header} - ${appData.options.SITENAME.str_value}</title>\n`;
    html += `<script defer src="header.js"></script>\n`;
    html += `<link rel="stylesheet" href="static/styles.css">\n`;
    html+=`</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs=await composeContent(22,coreData,appData); // мы точно знаем, что в макете одного вида капкейков в шапке - всегда контент 22
    let footerContentHTMLs=await composeContent(33,coreData,appData); // в макете одного вида капкейков в подвале - всегда контент 33
    let urlCupcakeContentHTMLs=await composeContent(66,coreData,appData); // в макете одного вида капкейков в "капкейки из УРЛа" - всегда контент 66

    html += `<header><div class="header-container">${headContentHTMLs.join("\n")}</div></header>\n`;
    html += `\n`;

    html += `<main class="main-container"><div class="cupcake-container">${urlCupcakeContentHTMLs.join("\n")}</div></main>\n`;
    html += `\n`;

    html += `<footer><div class="footer-container">${footerContentHTMLs.join("\n")}</div></footer>\n`;

    html += `</html>\n`;

    console.log('html:', html);


    return html;
}



module.exports = {
    composeMaket_IndPage_Main,
    composeMaket_IndPage_Login,
    composeMaket_IndPage_Cakes,
    composeMaket_IndPage_Cupcakes,
    composeMaket_Cake,
    composeMaket_Cupcake,
    composeMaket_IndPage_Admin
};
