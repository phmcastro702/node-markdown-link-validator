const chalk = require('chalk');
const fs = require('fs');

const inputArgs = cleanArgs(process.argv);


const getFileAsync = (pathToFile) => {
    const encoding = 'utf8';
    fs.promises
        .readFile(pathToFile, encoding)
        .then((fileData => console.log(chalk.green.bgBlue(fileData))))
        .catch(handleError);
};

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

// getFileSync('./arquivos/texto1.md');

getFileAsync(inputArgs[0]);