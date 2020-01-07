

//const model = require('../model')

const methods = require('../methods')
module.exports = {
  "list":{method:methods.post},
  "addRecordItem":{method:methods.post},
  "recordTypeList":{method:methods.post},
  "removeRecordItem":{method:methods.post},
  "updateRecordItem":{method:methods.post},
}
