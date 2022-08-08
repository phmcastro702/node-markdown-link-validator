const chalk = require('chalk');
const fs = require('fs');

const inputArgs = cleanArgs(process.argv);

// Código assíncrono com Async Await
const getFileAsyncAwait = async (pathToFile) => {
    const encoding = 'utf8';

    try {
        const fileData = await fs.promises.readFile(pathToFile, encoding);
        console.log(chalk.green.bgBlue(fileData));
        extractLinks(fileData);
    } catch (err) { handleError(err); }

};

// Código assíncrono com promise .then .catch
const getFileAsync = (pathToFile) => {
    const encoding = 'utf8';
    fs.promises
        .readFile(pathToFile, encoding)
        .then((fileData => console.log(chalk.green.bgBlue(fileData))))
        .catch(handleError);
};

// Código síncrono
const getFileSync = (pathToFile) => {
    const encoding = 'utf8';
    fs.readFile(pathToFile, encoding, (err, fileData) => {
        if (err) {
            handleError(err);
        }
        console.log(chalk.green.bgBlue(fileData));
    });
};

const handleError = (err) => {
    throw new Error(chalk.black.bgMagenta(err));
};

function cleanArgs(argsArr) {
    return argsArr.slice(2);
}

function extractLinks(strText) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const result = strText.match(regex);
    console.table(result);
}

// getFileSync('./arquivos/texto1.md');

// getFileAsync(inputArgs[0]);

getFileAsyncAwait(inputArgs[0]);