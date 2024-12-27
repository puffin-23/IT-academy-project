const { logLine } = require('./utils');
const { selectQueryFactory } = require("./utils_db");

// приходится экспортировать это тут, заранее, т.к. blocks.js импортирует composeContent из этого модуля!
module.exports = {
    composeContent,
};

const {
    composeBlock_Header, composeBlock_FormattedText,
    composeBlock_Search,
    composeBlock_SitesName,
    composeBlock_ImageLogo,
    composeBlock_Image,
    composeBlock_Contacts,
    composeBlock_LinkToMainPage,
    composeBlock_ButtonToSearch,
    composeBlock_ButtonToBasket,
    composeBlock_ButtonToLogin,
    composeBlock_LinkToCakes, composeBlock_LinkToCupcakes,
    composeBlock_FormToLogin,
    composeBlock_CakesList,
    composeBlock_CupcakesList,
    composeBlock_URLCake_Header, composeBlock_URLCake_Text,
    composeBlock_URLCupcake_Header, composeBlock_URLCupcake_Text,
    composeBlock_Container_LtR, composeBlock_Menu,
} = require("./blocks");

async function composeContent(contentId, coreData, appData) {

    // получим список блоков, составляющих этот контент
    let contentBlocks = await selectQueryFactory(coreData.connection, `
        select contents_blocks.id, contents_blocks.block_type, block_types.code block_type_code, contents_blocks.block_attributes
        from contents_blocks, block_types
        where contents_blocks.content=? and contents_blocks.block_type=block_types.id
        order by contents_blocks.content_ord
    ;`, [contentId]);



    let contentHTMLs = [];
    for (let cb = 0; cb < contentBlocks.length; cb++) {
        const contentBlock = contentBlocks[cb];

        // у каждого блока могут быть индивидуальные опции в поле block_attributes, распарсим в объект
        let blockAttributes = {};
        if (contentBlock.block_attributes && contentBlock.block_attributes.trim()) {
            try {
                blockAttributes = JSON.parse(contentBlock.block_attributes);
            }
            catch (err) {
                // исключения не должны ломать страницу! максимум - надо просто пропустить кривой блок, мы же попробуем продолжить без атрибутов
                logLine(coreData.logFN, `ошибка распарсивания атрибутов блока ${contentBlock.id}: ${err}`);
            }
        }

        let blockHTML = '';

        switch (contentBlock.block_type_code) {
            case 'SITES_NAME':
                blockHTML = await composeBlock_SitesName(coreData, appData, blockAttributes);
                break;
            case 'HEADER':
                blockHTML = await composeBlock_Header(coreData, appData, blockAttributes);
                break;
            case 'FORMATTED_TEXT':
                blockHTML = await composeBlock_FormattedText(coreData, appData, blockAttributes);
                break;
            case 'IMAGE_LOGO':
                blockHTML = await composeBlock_ImageLogo(coreData, appData, blockAttributes);
                break;
            case 'IMAGE':
                blockHTML = await composeBlock_Image(coreData, appData, blockAttributes);
                break;
            case 'CONTACTS':
                blockHTML = await composeBlock_Contacts(coreData, appData, blockAttributes);
                break;
            case 'LINK_TO_MAIN':
                blockHTML = await composeBlock_LinkToMainPage(coreData, appData, blockAttributes);
                break;
            case 'SEARCH':
                blockHTML = await composeBlock_Search(coreData, appData, blockAttributes);
                break;
            case 'BUTTON_TO_SEARCH':
                blockHTML = await composeBlock_ButtonToSearch(coreData, appData, blockAttributes);
                break;
            case 'BUTTON_TO_BASKET':
                blockHTML = await composeBlock_ButtonToBasket(coreData, appData, blockAttributes);
                break;
            case 'BUTTON_LOGIN':
                blockHTML = await composeBlock_ButtonToLogin(coreData, appData, blockAttributes);
                break;
            case 'CONTAINER_LTR':
                blockHTML = await composeBlock_Container_LtR(coreData, appData, blockAttributes);
                break;
            case 'MENU':
                blockHTML = await composeBlock_Menu(coreData, appData, blockAttributes);
                break;
            case 'LINK_TO_CAKES':
                blockHTML = await composeBlock_LinkToCakes(coreData, appData, blockAttributes);
                break; 
            case 'LINK_TO_CUPCAKES':
                blockHTML = await composeBlock_LinkToCupcakes(coreData, appData, blockAttributes);
                break;
            case 'FORM_TO_LOGIN':
                blockHTML = await composeBlock_FormToLogin(coreData, appData, blockAttributes);
                break;
            case 'CAKES_LIST':
                blockHTML = await composeBlock_CakesList(coreData, appData, blockAttributes);
                break;
            case 'CUPCAKES_LIST':
                blockHTML = await composeBlock_CupcakesList(coreData, appData, blockAttributes);
                break;
            case 'URL_CAKE_HEADER':
                blockHTML=await composeBlock_URLCake_Header(coreData,appData,blockAttributes);
                    break;
            case 'URL_CAKE_TEXT':
                blockHTML=await composeBlock_URLCake_Text(coreData,appData,blockAttributes);
                    break;  
            case 'URL_CUPCAKE_HEADER':
                blockHTML=await composeBlock_URLCupcake_Header(coreData,appData,blockAttributes);
                    break;
            case 'URL_CUPCAKE_TEXT':
                blockHTML=await composeBlock_URLCupcake_Text(coreData,appData,blockAttributes);
                    break;          
            default:
                logLine(coreData.logFN, `cannot compose block id=${contentBlock.id} - type code ${contentBlock.block_type_code} unknown`);
        }

        contentHTMLs.push(blockHTML);  
    }

    console.log('contentHTMLs:', contentHTMLs);
    return contentHTMLs;
}
