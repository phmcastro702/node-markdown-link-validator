const fetch = require('node-fetch');
const chalk = require('chalk');


async function checkHTTPStatus(urlArray) {

    try {
        const urlStatusArray = await Promise.all(urlArray.map(async (url) => {
            const res = await fetch(url);
            console.log(chalk.yellowBright('HTTP request to ' + url + ': '), (res.status === 200) ? chalk.greenBright.bgBlackBright('200 OK\n') : chalk.red(res.status + 'FAIL\n'));
            return res.status;
        }));
        return urlStatusArray;

    } catch (err) {
        handleErrors(err);
    }
}

const handleErrors = (err) => {
    throw new Error(err.message);
};

const getArrayURLs = (urlObjArray) => {
    return urlObjArray.flat().map(urlObj => Object.values(urlObj)[0]);
};

const validateURLs = (urls) => {
    return checkHTTPStatus(getArrayURLs(urls));
};




module.exports = validateURLs;