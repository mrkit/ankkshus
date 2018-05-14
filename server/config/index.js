const merge = require('lodash.merge');
const secrets = require('../../.env');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;

console.log('Config', env);

const baseConfig = {
  port: 3000,
  secrets: {},
  db: {
    url: '',
    settings: {
      logging: false,
      operatorsAliases: false
    }
  }
}

let envConfig = {};

switch(env){
  case 'development':
  case 'dev':
    envConfig = require('./dev');
    break;
  case 'production':
  case 'prod':
    envConfig = require('./prod');
    break;
  default:
    envConfig = require('./dev');
}

module.exports = merge(baseConfig, envConfig);
  
  
