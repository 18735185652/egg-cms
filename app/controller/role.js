'use strict';
const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(...args){
    super(...args);
    this.entity = 'role'
  }
  async getResource(){
    const {ctx,service} = this;
    const result = await service.role.getResource();
    ctx.body = result
  }
  async setResource(){
    const {ctx,service} = this;
    let body = ctx.request.body; // {roleId:1,roleResources:[1,2,3]}
    await service.role.setResource(body);
    this.success('授权成功');
  }
  async getUser(){
    const {ctx,service} = this;
    const result = await service.role.getUser();
    console.log('getUser',ctx.session.user);
    ctx.body = result
  }
  async setUser(){
    const {ctx,service} = this;
    let body = ctx.request.body; // 
    await service.role.setUser(body);
    console.log('setUser',ctx.session.user);
    this.success('授权成功');
  }
}

module.exports = RoleController;
