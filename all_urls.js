const { selectQueryFactory } = require("./utils_db");

// возвращает массив со всеми УРЛами (страницами) сайта
async function getUrls(connection) {

    let urls=[];

    let indPages=await selectQueryFactory(connection, `select url_code from indpages;`, []);
    indPages.forEach( indPageRow => {
        urls.push({
            url:`/${indPageRow.url_code}`,
            groupCode:'indpage',
            groupParams:{indPageURLCode:indPageRow.url_code},
        });
    } );
}

module.exports={
    getUrls,
};
