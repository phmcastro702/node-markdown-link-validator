const chalk = require('chalk');
const readFile = require('./index');
const validateURLs = require('./http-request-validation');

const cleanedArgs = process.argv.slice(2);


(
    async () => {
        let results = [];

        if (cleanedArgs[0] === 'validate') {
            results = await readFile(cleanedArgs[1]);

            console.log('Validate:', await validateURLs(results));
            return;
        }

        results = await readFile(cleanedArgs[0]);
        console.log(chalk.yellow('Link\'s list: \n'), results);
    }
)();
