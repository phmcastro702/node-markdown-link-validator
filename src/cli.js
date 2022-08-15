const chalk = require('chalk');
const readFile = require('./index');

const cleanedArgs = process.argv.slice(2);


(
    async () => {
        const results = await readFile(cleanedArgs[0]);
        console.log(chalk.yellow('Link\'s list: \n'), results);
    }
)();
