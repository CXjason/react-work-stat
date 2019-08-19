
const methods = require('../methods')

module.exports = {
  'list': { method: methods.post },
  'add': { method: methods.post },
  'update': { method: methods.post },
  'del': { method: methods.post },
  "login":{method:methods.post},
}
