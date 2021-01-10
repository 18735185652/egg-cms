'use strict';
const BaseController = require('./base');

class ResourceController extends BaseController {
  constructor(...args){
    super(...args);
    this.entiy = 'resource'
  }
  async getResource(){
    const {ctx,service} = this;
    const result = await service.role.getResource();
    ctx.body = result
  }
  async setResource(){

  }
  async getUser(){

  }
  async setUser(){
    
  }

}

module.exports = ResourceController;
