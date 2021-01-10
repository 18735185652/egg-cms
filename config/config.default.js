/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609166382027_8847';

  // add your middleware config here
  config.middleware = ['auth'];
  config.auth = {
    authUrls:[
      '/api/role/getUser',
      '/api/role/setUser'
    ]
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.security = {
    csrf: false,
    domainWhiteList:['http://localhost:8000']
  }
  userConfig.jwtSecret='zhufeng';
  userConfig.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'qq216602',
      database: 'cms'
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
// href=""