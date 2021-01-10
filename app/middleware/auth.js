const {verify} = require('jsonwebtoken');

function verifyToKen(token,secret){
    return new Promise((resolve,reject)=>{
        verify(token,secret,function(err,payload){
            if(err){
                reject(err)
            }else {
                resolve(payload)
            }
        })
    })
}
module.exports = (options,app)=>{

    return async (ctx,next)=>{
        //在此进行权限判断
        const authUrls = options.authUrls;
        if(authUrls.includes(ctx.url)){
            const authorization = ctx.get('Authorization')
            if(authorization){
                try{
                   let user = await verifyToKen(authorization,app.config.jwtSecret);
                   ctx.session.user=user
                   await next()
                }catch(err){
                    ctx.status = 401;
                    ctx.body = 'Token验证失败'
                }
            }else {
                ctx.status = 401;
                ctx.body = '没有Token'
            }
        }else {
            next()
        }
    }
}

