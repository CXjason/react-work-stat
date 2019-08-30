

const fs = require("fs");
const nodeExcel = require('excel-export');

const conf = {};
// 定义sheet名称
conf.name = "DBData";
// 定义列的名称以及数据类型
conf.cols = [{
  caption:'Name',
  type:'string'
},{
  caption:'Type',
  type:'string'
}];

// 定义row的数据
conf.rows = ['Tom', "String"];
// execute方法生成文件源数据
const result = nodeExcel.execute(conf);
// fs将文件写到内存
fs.writeFile(`${__dirname}/test.xlsx`, result, 'binary', (err) => {
  err ? console.log(err) : null;
});
