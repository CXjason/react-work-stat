

const methods = require('../methods')

let model = {
	'departmentList': { method: methods.post },
	"ranksList":{method:methods.get},
	"taskList":{method:methods.post},
	"addTaskItem":{method:methods.post},
	"updateTaskItem":{method:methods.post},
	"removeTaskItem":{method:methods.post},
};

module.exports = model;
