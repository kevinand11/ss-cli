const chalk = require('chalk')

const message = 'The package is used for generating ss contents. Do not import or call any of its files. Instead use one of its binaries'
console.log(chalk.red(message))
throw Error(message)
