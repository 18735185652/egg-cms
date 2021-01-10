
const BaseService = require('./base');

class RoleService extends BaseService {
    constructor(...args){
      super(...args);
      this.entity = 'role'
    }
    async getResource(){
      const {app} = this;
      const resources = await app.mysql.select('resource')
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
      return rootMenus;
    }

    async setResource({roleId,resourceIds}){
      const {app} = this; // roleId = 1  resourcesIds=[1,2,3]
      const conn = await app.mysql.beginTransaction();
      
      try{
        await conn.query(`DELETE FROM role_resource WHERE role_id=?`,[roleId])
        for(let i=0;i<resourceIds.length;i++){
          const resourceId = resourceIds[i];
          await conn.insert('role_resource',{
            role_id:roleId,
            resource_id: resourceId
          })
        }
        await conn.commit();
      }catch(err){
        conn.rollback();
        throw error;
      }
      
    }
    async getUser(){
      const {app} = this;
      return await app.mysql.select('user')   
    }
    async setUser({roleId,userIds}){
      const {app} = this; // roleId = 1  resourcesIds=[1,2,3]
      const conn = await app.mysql.beginTransaction();
       try{
        await conn.query(`DELETE FROM role_user WHERE role_id=?`,[roleId])
        for(let i=0;i<userIds.length;i++){
          const userId = userIds[i];
          await conn.insert('role_user',{
            role_id:roleId,
            user_id: userId
          })
        }
        await conn.commit();
       }catch(error){
        conn.rollback();
        throw error;
       }
     
    }

}

module.exports = RoleService;