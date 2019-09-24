


let jsonClone = function(data){
	return JSON.parse(JSON.stringify(data));
};

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

// 找到数据中的唯一值
let findArrDataVal = function(arrData,key){

	let ret = [];

	arrData.forEach(item => {

		ret.push(item[key])
	});

	return ret;
};


// 将数组转变为json
let arrToJson = function(arr,val){

	let retJson = {};
	arr.forEach(item => {
		retJson[item] = val;
	});

	return retJson;
}

// 统计圆形echarts  组合数据
let collCircularStatData = function(data,setData){

	let retData = [];

	for(let key of setData){

		let json = {
			name:key["name"],
			value:0
		};

		for(let item of data){

			if(key["status"] == item.is_finish){
				json["value"] += 1;
			}
		}

		retData.push(json);


	}

	return retData;
}


// 统计圆形echarts  的selected数据
let collCircularStatSelected = function(data){

	let retJson = {};

	data.forEach(item => {

		if(item["value"] > 0){

			retJson[item.name] = true;
		}else{
			retJson[item.name] = false;
		}
	});

	return retJson;

};



export {
	jsonClone,
	addDataKey,
	addDataNum,
	findArrKeyVal,
	findArrDataVal,
	arrToJson,
	collCircularStatData,
	collCircularStatSelected,
}

