'use strict';
const BaseController = require('./base');

class RoleResourceController extends BaseController {
  constructor(...args){
    super(...args);
    this.entiy = 'roleResource'
  }
}

module.exports = RoleResourceController;
