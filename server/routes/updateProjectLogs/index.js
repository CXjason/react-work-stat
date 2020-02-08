

const methods = require('../methods')

let model = {
	'updateProjectLogsList': { method: methods.post },
	"updateProjectLogsItem":{method: methods.post},
	"addUpdateProjectLogsItem":{method: methods.post},
	"remoteUpdateProjectLogsItem":{method: methods.post},
};

module.exports = model;
