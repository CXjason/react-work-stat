

const pojo = require('../../helper/pojo')
const { success, failed } = pojo


module.exports = (config, file) => {
  const controller = require(`../../controller/${file}`);
	return config.reduce((copy, name) => {
    copy[name] = async ctx => {
      let res;
      try {
        const val = ctx.request.body

        await controller[name](val).then(result => {
          res = success(result);

          // 判断是否登录接口  存储用户信息到session
          if(file == "user" && name == "login"){
            let userInfo = result[0] || {};
            ctx.session[userInfo.pk] = userInfo;
          };


        })
      } catch(err) {
        res = failed(err)
      }
      ctx.body = res
    }
	  return copy
	}, {})
}
