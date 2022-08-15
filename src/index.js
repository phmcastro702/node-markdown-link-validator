const chalk = require('chalk');
const fs = require('fs');
const path = require('path');


// Código assíncrono com Async Await
const getFileAsyncAwait = async (relativePathToDir) => {
    const encoding = 'utf8';
    const absolutePathToDir = path.join(__dirname, '..', relativePathToDir);

    try {
        const filesInDir = await fs.promises.readdir(absolutePathToDir, { encoding });

        const results = Promise.all(
            filesInDir.map(
                async (fileName) => {
                    const fileTextContent = await fs.promises.readFile(`${absolutePathToDir}/${fileName}`, encoding);
                    return extractLinks(fileTextContent);
                }
            )
        );

        return results;
    } catch (err) { handleError(err); }

};

const handleError = (err) => {
    throw new Error(chalk.black.bgMagenta(err));
};

function extractLinks(strText) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;

    const results = [];
    let tmp;
    while ((tmp = regex.exec(strText)) !== null) {
        results.push({
            [tmp[1]]: tmp[2]
        });
    }

    return results.length === 0 ? 'No links found.' : results;
}


module.exports = getFileAsyncAwait;












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