var logger = require('loglevel');
logger.disableAll();
logger.setDefaultLevel('trace');
logger.setLevel('trace');
//overriding default logger.
console.log = logger.info;
console.error = logger.error;
console.warn = logger.warn;
console.debug = logger.debug;

global.logger = logger;
