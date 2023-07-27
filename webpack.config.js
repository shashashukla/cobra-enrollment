'use strict';

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

if (isProduction){
    console.log("Webpack production environment build triggered")
    module.exports = require('./config/webpack.config.prod');
}
else{
    console.log("Webpack test environment build triggered")  
    module.exports = require('./config/webpack.config.test');
} 