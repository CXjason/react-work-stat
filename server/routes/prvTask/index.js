

const methods = require('../methods')

let model = {
	'taskList': { method: methods.post },
	"addTaskItem":{method:methods.post},
	"updateTaskItem":{method:methods.post},
};

module.exports = model;
