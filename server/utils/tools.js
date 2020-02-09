

const moment = require("moment");
const crytoFn = require("./cryptoTool.js");

// 数据中格式化时间
let formatDataTime = function(arrData,key,format="YYYY-MM-DD HH:mm:ss"){

	arrData.forEach(item => {

		if(item[key]){
			item[key] = moment(item[key]).format(format);
		};

		
	})
};

// 将其他放到最后
let otherLast = function(arrData,key1,value){


	for(let i = 0;i < arrData.length;i++){

		let item = arrData[i];

		if(item[key1]  == value){

			let remItem = arrData.splice(i,1);
			arrData.push(remItem[0]);
			break;
		}
	};

	return arrData;
};


// 转换任务状态为文字

let taskStatusToText = function(status){

	// 任务状态(0:未完成，1：完成中，2：已完成，3：已审核)

	let val = status;

	if(status === 0 || status === '0'){
		val = "未完成";
	}else if(status == 1){
		val = "完成中";
	}else if(status == 2){
		val = "已完成";
	}else if(status == 3){
		val = "已审核";
	};

	return val;

};

// 任务计划数据解密
let decryptArrData = function(arr){

	arr.forEach(item => {

		if(item.task_content){
			item.task_content = crytoFn.getDecAse192(item.task_content,crytoFn.crytoKey);
		}
	});
};





exports.formatDataTime = formatDataTime;
exports.otherLast = otherLast;
exports.taskStatusToText = taskStatusToText;
exports.decryptArrData = decryptArrData;



