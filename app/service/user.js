
const BaseService = require('./base');

class UserService extends BaseService {
    constructor(...args){
      super(...args);
      this.entity = 'user'
    }
    async list(pageNum, pageSize, where) {
      // 查询当页的数据 特定页的记录数据
     const data =  await this.app.mysql.select(this.entity, {
        where,
        order: [['id', 'asc'], ['username', 'asc']],
        offset: (pageNum - 1) * pageSize,
        limit: pageSize
      })
      console.log('data',data);
      for(let i=0;i<data.length;i++){
        let user = data[i];
       let resources = await this.app.mysql.query(`SELECT * from resource 
        INNER JOIN role_resource on resource.id = role_resource.resource_id
        INNER JOIN role_user on role_resource.role_id = role_user.role_id
        where role_user.user_id=?
        `,[user.id])
        const rootMenus = [];
        const map = {};
      
        resources.forEach(resource=>{
          resource.children = [];
          map[resource.id] = resource; //把资源的id和资源的对象关系存放到了map中
          if(resource.parent_id === 0){
            rootMenus.push(resource)
          }else {
            map[resource.parent_id].children.push(resource)
          }
        })
        user.resources =  rootMenus 
     
      }
      const total = await this.app.mysql.count(this.entity,where)
      return {data,total}
    }
}

module.exports = UserService;