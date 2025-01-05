const fs = require('fs');
const os = require('os');
const jwt = require('jsonwebtoken');
const Jimp = require('jimp');

// пишет строку в файл лога и одновременно в консоль
function logLine(logFilePath, logLine) {

    return new Promise((resolve, reject) => {

        const logDT = new Date();
        let time = logDT.toLocaleDateString() + " " + logDT.toLocaleTimeString();
        let fullLogLine = time + " " + logLine;

        console.log(fullLogLine); // выводим сообщение в консоль

        fs.open(logFilePath, 'a+', (err, logFd) => {
            if (err)
                reject(err);
            else
                fs.write(logFd, fullLogLine + os.EOL, (err) => {
                    if (err)
                        reject(err);
                    else
                        fs.close(logFd, (err) => {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        });
                });

        });

    });

}

let dividerRES = "[ \n\r]";
let tagNameRES = "[a-zA-Z0-9]+";
let attrNameRES = "[a-zA-Z]+";
let attrValueRES = "(?:\".+?\"|'.+?'|[^ >]+)";
let attrRES = "(" + attrNameRES + ")(?:" + dividerRES + "*=" + dividerRES + "*(" + attrValueRES + "))?";
let openingTagRES = "<(" + tagNameRES + ")((?:" + dividerRES + "+" + attrRES + ")*)" + dividerRES + "*/?>"; // включает и самозакрытый вариант
let closingTagRES = "</(" + tagNameRES + ")" + dividerRES + "*>";

let openingTagRE = new RegExp(openingTagRES, "g");
let closingTagRE = new RegExp(closingTagRES, "g");

// удаляет из строки все теги
function removeTags(str, replaceStr = "") {
    if (typeof (str) == "string" && str.indexOf("<") != -1) {
        str = str.replace(openingTagRE, replaceStr);
        str = str.replace(closingTagRE, replaceStr);
    }
    return str;
}

function reportServerError(error, res, logFN) {
    if (res)
        res.status(500).end();
    if (logFN)
        logLine(logFN, error);
}

function reportRequestError(error, res, logFN) {
    if (res)
        res.status(400).end();
    if (logFN)
        logLine(logFN, error);
}

// используется для преобразования массива объектов в объект объектов, ключом будет указанное свойство
// например, массив:
// [ { id:5, name:'aaa' }, { id:7, name:'bbb' } ]
// преобразуется в:
// { 5:{ id:5, name:'aaa' }, 7:{ id:7, name:'bbb' } }
function arrayToHash(arr, keyField) {
    let hash = {};
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        let key = row[keyField];
        hash[key] = row;
    }
    return hash;
}

function processText(text, appData) {

    // в appData.options ожидается объект с опциями

    // макрос {OS|code} используется для подстановки значения строковой настройки с кодом code
    // макрос {OI|code} используется для подстановки значения целочисленной настройки с кодом code
    // макрос {OF|code} используется для подстановки значения дробной настройки с кодом code
    // макрос {OT|code} используется для подстановки значения длиннотекстовой настройки с кодом code

    text = text.replace(/\{O([SIFT])\|([a-zA-Z0-9_-]+)\}/g, (hitStr, typeLetter, optionCode, hitIndex, allStr) => {
        const option = appData.options[optionCode];
        if (!option) {
            console.error('processText: option ' + optionCode + ' not found');
            return hitStr;
        }
        switch (typeLetter) {
            case 'S':
                return processText(option.str_value, appData); // почему бы и не разрешить в значении строковой опции тоже использовать макросы?
            case 'I':
                return option.int_value + ''; // возможно нужно добавить форматирование
            case 'F':
                return option.float_value; // возможно нужно добавить форматирование, например запятую вместо точки
            case 'T':
                return processText(option.text_value, appData);
        }
    });

    return text;
}

async function compressImage(filePath, outputPath) {
    try {
        const image = await Jimp.read(filePath);
        await image.resize(800, Jimp.AUTO) // Изменяем размер, ширина 800px, высота - пропорционально
            .quality(80) // Устанавливаем качество на 80
            .writeAsync(outputPath)// Записываем сжатую версию
        console.log('Изображение успешно сжато');
        
    } catch (err) {
        console.error('Ошибка при сжатии изображения:', err);
    }
}
async function scanDirectory(directoryPath) {
    const files = fs.readdir(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = fs.stat(filePath);
        if (stats.isDirectory()) {
            await scanDirectory(filePath);
        } else {
            return filePath
        }
    }
}
module.exports = {
    logLine,
    reportServerError,
    reportRequestError,
    removeTags,
    arrayToHash,
    processText,
    compressImage,
    scanDirectory
};
