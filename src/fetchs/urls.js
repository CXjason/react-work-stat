

let ipconfig = "http://192.168.2.123:8891/";
let getLoginUrl = "/jasonWorkStat/user/login";//登录
let getTaskListUrl = "/jasonWorkStat/task/taskList";//获取任务列表
let getUserLIstUrl = "/jasonWorkStat/user/userList";// 获取用户列表
let getDepartmentListUrl = "/jasonWorkStat/task/departmentList";// 获取部门列表
let getAddTaskItemUrl = "/jasonWorkStat/task/addTaskItem";// 新增一条任务
let getUpdateTaskItemUrl = "/jasonWorkStat/task/updateTaskItem";// 修改一条任务
let getRemoveTaskItemUrl = "/jasonWorkStat/task/removeTaskItem";// 删除一条任务
let getProjectListUrl = "/jasonWorkStat/project/projectList"; // 获取项目列表
let getAddProjectUrl = "/jasonWorkStat/project/addProject";// 添加项目
let getUpdateProjectUrl = "/jasonWorkStat/project/updateProject";// 修改项目
let getTaskExportXlsxUrl = "/jasonWorkStat/tools/exportTaskXlsx";// 导出xlsx

export {
  ipconfig,
  getLoginUrl,
  getTaskListUrl,
  getUserLIstUrl,
  getDepartmentListUrl,
  getProjectListUrl,
  getAddTaskItemUrl,
  getUpdateTaskItemUrl,
  getRemoveTaskItemUrl,
  getAddProjectUrl,
  getUpdateProjectUrl,
  getTaskExportXlsxUrl,
}
