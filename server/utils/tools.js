

const moment = require("moment");

// 数据中格式化时间
let formatDataTime = function(arrData,key,format="YYYY-MM-DD HH:mm:ss"){

	arrData.forEach(item => {

		if(item[key]){
			item[key] = moment(item[key]).format(format);
		};

		
	})
};


exports.formatDataTime = formatDataTime;



