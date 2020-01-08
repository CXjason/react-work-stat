

const { apiPrefix } = require("./config.js");


module.exports = (config => {
	return config.reduce((copy, name) => {
	    const obj = require(`./${name}`)
	    const newArr = Object.keys(obj).reduce((total, each) => {
		    let item = { path: `${apiPrefix}/${name}/${each}`, method: obj[each].method, action: each, service: name }
		    total.push(item)
		    return total
	    }, [])
    copy = copy.concat(newArr)
	 return copy
	}, [])
})([
  'user',
  'task',
  'project',
  "tools",
  "prvUser",
  "prvTask",
  "punchCard",
  "affairRecord",
  "updateProjectLogs",
]);



