'use strict';

const {Controller} = require('egg');

class BaseController extends Controller {
  success(data){
    this.ctx.body = {
      code:0,
      data
     };
  }
  error(error){
    this.ctx.body = {
      code:1,
      error
     };
  }
  async index() {
    const { ctx, service } = this;
    const {pageNum,pageSize,...where} = ctx.query;
    let list = await service[this.entiy].list(isNaN(pageNum) ? 1 :parseInt(pageNum) ,isNaN(pageSize) ? 5: parseInt(pageSize),where)
    this.success(list)
  }
  async create() { // post 新增
    const { ctx, service } = this;
    let entity = ctx.request.body;
    const result = await service[this.entity].create(entity)
    result ? this.success('success') : this.error('创建失败')
  }
  async update(){ // put 修改
    const { ctx, service } = this;
    let id = ctx.params.id;
    let entity = ctx.request.body;
    user.id = id;
    const result = await service[this.entity].update(entity)
    result ? this.success('success') : this.error('更新失败')

  }
  async destroy(){ // delete
    const { ctx, service } = this;
    let id = ctx.params.id;
    const result = await service[this.entity].destroy(id);
    result ? this.success('success') : this.error('删除失败');
  }

}

module.exports = BaseController;
