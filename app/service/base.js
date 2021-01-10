
const { Service } = require('egg');

class BaseService extends Service {
  async list(pageNum, pageSize, where) {
    // 查询当页的数据 特定页的记录数据
   const data =  await this.app.mysql.select(this.entity, {
      where,
      order: [['id', 'asc'], ['username', 'asc']],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize
    })
    const total = await this.app.mysql.count(this.entity,where)
    return {data,total}
  }
  async create(entity) {
    const result = await this.app.mysql.insert(this.entity, entity)
    return result.affectedRows > 0;
  }
  async update(entity) {
    const result =  await this.app.mysql.update(this.entity, entity)
    return result.affectedRows > 0;
  }
  async destroy(id) {
    const result =  await this.app.mysql.delete(this.entity, { id })
    return result.affectedRows > 0;
  }

}

module.exports = BaseService;