


const fs = require("fs");
const path = require("path");
const pojo = require('../../helper/pojo');
const { success, failed } = pojo;
const nodeExcel = require('excel-export');


const { 
	formatDataTime,
	otherLast,
	taskStatusToText
}  = require("../../utils/tools.js");


exports.exportTaskXlsx = async ctx => { // 导出xlsx表


	let taskData = ctx.request.body.data;

	let xlsxData = await exportdata(taskData);

	let filename = "task_"+Date.parse(new Date)+".xlsx";
	let url = path.resolve(__dirname,"../../upload/" + filename);
	fs.writeFileSync(url, xlsxData, 'binary');

	ctx.body = success(filename);
	
    //ctx.body = xlsxData;

}


// 导出excel
async function exportdata(v) {
    let conf ={};
    conf.name = "task";//表格名
    let alldata = new Array();
    for(let i = 0;i<v.length;i++){
        let arr = new Array();

        let publisher_person = v[i].publisher_person || "";
        let department = v[i].department || "";
        let task_content = v[i].task_content || "";
        let is_finish = taskStatusToText(v[i].is_finish) || "";
        let project_name = v[i].project_name || "";
        let create_time = v[i].create_time || "";
        let finish_time = v[i].finish_time || "";
        let finish_preson = v[i].finish_preson || "";

        arr.push(publisher_person);
        arr.push(department);
        arr.push(task_content);
        arr.push(is_finish);
        arr.push(project_name);
        arr.push(create_time);
        arr.push(finish_time);
        arr.push(finish_preson);
        alldata.push(arr);
    }
    //决定列名和类型
    conf.cols = [
	    {
	        caption:'发布人',
	        type:'string',
	        width:12
	    },
	    {
	        caption:'部门',
	        type:'string',
	        width:12
	    },
	    {
	        caption:'内容',
	        type:'string',
	        width:140
	    },
	    {
	        caption:'状态',
	        type:'string',
	        width:10
	    },
	    {
	        caption:'所属项目',
	        type:'string',
	        width:30
	    },
	    {
	        caption:'新建时间',
	        type:'string',
	        width:30
	    },
	    {
	        caption:'完成时间',
	        type:'string',
	        width:30
	    },
	    {
	        caption:'完成人',
	        type:'string',
	        width:12
	    }
    ];
    conf.rows = alldata;//填充数据
    let result = nodeExcel.execute(conf);
    //最后3行express框架是这样写
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    // res.end(result, 'binary');
    //let data = Buffer.from(result,'binary');

    return result;
    
}

