'use strict';
const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');
const {sign} = require('jsonwebtoken')
class UserController extends BaseController {
  constructor(...args){
    super(...args);
    this.entiy = 'user'
  }
  async captcha(){
    let {ctx} = this;
    let captchaObj = svgCaptcha.create(); // captcha = {text,data}
    ctx.session.captcha = captchaObj.text; //啊把文本信息存放到会话中的captcha属性中
   
    ctx.set('Contentt-Type','image/svg+xml')
    ctx.body = captchaObj.data
  }
  async checkCaptcha(){
    let {ctx} = this;
    let captcha = ctx.request.body.captcha;
    if(captcha === ctx.session.captcha){
      ctx.body = '验证成功'
    }else {
      ctx.body = '验证失败'
    }
  }
  async signup(){
    let {ctx,service} = this;
    let user = ctx.request.body;
    console.log('user: ', user);
    let result = await service.user.create(user);
    ctx.body = result
  }
  async signin(){
    let {ctx} = this;
    let {username,password} = ctx.request.body;
    let result = await ctx.app.mysql.select('user',{
      wuere:{username,password},
      limit:1
    })

    if(result && result.length>0){
        const user = JSON.parse(JSON.stringify(result[0]));
        delete user.password;
        this.success(sign(user,this.config.jwtSecret,{
          expiredAt: new Date(Date.now() + 60*1000)
        }))
    }else {
      this.error('登陆失败')
    }

  }
}

module.exports = UserController;
