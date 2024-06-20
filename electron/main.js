const { run } = require('./utils/init.js');
const { is_dev } = require('./utils/config.js');

console.log(`${is_dev ? 'development' : 'production'} environment`);

run();