


// 在数据中  将valKey的值复制到key中
let addDataKey = function(arrData,key,valKey){

	arrData.forEach(item => {

		item[key] = item[valKey];
	});

	return arrData;
};


// 增加序号 key:序号字段
let addDataNum = function(arrData,key="num"){

	arrData.forEach((item,index) => {

		item[key] = (index + 1);
	});
}

// json数组中找到对应的某个值
let findArrKeyVal = function(arrData,key,val){

	let ret = null;

	for(let item of arrData){

		if(item[key] == val){

			ret = item;
			break;
		}
	}

	return ret;
}




export {
	addDataKey,
	addDataNum,
	findArrKeyVal
}

