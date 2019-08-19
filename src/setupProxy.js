


const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  //app.use(proxy('/api', { target: 'http://localhost:5000/' }))
  	app.use(proxy('/apiLoca', { 
		target: 'http://127.0.0.1:8891/',
		changeOrigin:true,
		pathRewrite: {
		            "^/apiLoca": "/"
		        }
	}))
}