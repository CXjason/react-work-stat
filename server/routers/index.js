



const router = require("koa-router")();

const routes = require("../routes");

const { apiPrefix } = require("../routes/config.js");


routes.forEach(item => {

	const service = require(`../services/${item.service}`);

	router[item.method](item.path,service[item.action]);

});

router.post(apiPrefix+"/updateApp",async ctx => {

	//console.log(ctx.request.host);
	var val = ctx.request.body;
	var appName = val.name;  
  var appVersion = val.version;  
  var res = {
  	code:0,
  	data:null
  };

  if(appVersion != "1.0.0"){

  	var host = ctx.request.host

  	res.data = {
  		update: true,  
      wgtUrl: "http://" + host + "/wgt/__UNI__CAE4C1F.wgt",
  	}
  }else{
  	res.data = {
  		update: false,  
      wgtUrl: '',
  	}
  };

  ctx.body = res;


});


module.exports = router;


