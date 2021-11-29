const request = require('./request.cjs')
const Qs =  require('qs')

const getInfo = async (token)=>{
  const {data} =  await request({
    url:'/getInfo',
    headers:{
      Authorization:token
    }
  })
  return {name:data.user.userName,type:data.roles[0]}
}

module.exports = {
    login: async (ctx, next) => {
        const response = await request({
          data:Qs.stringify({...ctx.request.body,...{uuid:ctx.cookies.get('uid')}}),
          url:'/login',
          method:'post'
        })
        if(response.data.code === 200){
          ctx.cookies.set('tgt', response.headers.authorization, {httpOnly: false})
          const userInfo = await getInfo(response.headers.authorization)
          ctx.body = JSON.stringify({token:response.headers.authorization,name:ctx.request.body.username,type:userInfo.type})
        }
        else{
          ctx.response.status = response.data.code
          ctx.body = JSON.stringify(response.data)
        }
    },
    register: async (ctx, next) => {
      const {username,password} = ctx.request.body;
      const response = await request({
        data:Qs.stringify({loginName:username,password:password}),
        url: '/register/student',
        method:'post'
      })
      if(response.data.code === 200){
        ctx.body = JSON.stringify(response.data)
      }
      else{
        ctx.response.status = response.data.code
        ctx.body = JSON.stringify(response.data)
      }
    },
    verifyPic:async (ctx,next)=>{
      const response = await request({
        url:'/captcha/captchaImage'
      })
      ctx.type = 'image/jpeg;charset=UTF-8'
      ctx.cookies.set('uid',response.data.uuid)
     
      ctx.body = JSON.stringify(response.data.img)
    },
    getUserInfo:async (ctx,next)=>{
      const res = await getInfo(ctx.request.header.authorization)
      ctx.body = JSON.stringify(res)
    },
    findpwd:async (ctx, next) => {
      const response = await request({
        data:Qs.stringify({...ctx.request.body}),
        url:'/system/user/profile/forgetPwd',
        method:'post'
      })
      if (response.data.code !== 200) {
        ctx.response.status = response.data.code
      } 
      ctx.body = JSON.stringify(response.data)
    },
    activate:async (ctx, next) => {
      const response = await request({
        data:Qs.stringify({...ctx.request.body}),
        url:'/system/user/profile/activate',
        method:'post'
      })
      if (response.data.code !== 200) {
        ctx.response.status = response.data.code
      } 
      ctx.body = JSON.stringify(response.data)
    },
    setNewPwd:async (ctx, next) => {
      const response = await request({
        data:Qs.stringify({...ctx.request.body}),
        url:'/system/user/profile/setNewPwd',
        method:'post'
      })
      if (response.data.code !== 200) {
        ctx.response.status = response.data.code
      } 
      ctx.body = JSON.stringify(response.data)
    },
    resetPwd:async (ctx, next) => {
      const response = await request({
        data:Qs.stringify({...ctx.request.body}),
        url:'/system/user/profile/resetPwd',
        method:'post',
        headers: { Authorization: ctx.request.header.authorization }
      })
      if (response.data.code !== 200) {
        ctx.response.status = response.data.code
      } 
      ctx.body = JSON.stringify(response.data)
    }
  };
  