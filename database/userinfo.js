//创建表规则 得到表操作对象
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const crypto = require('crypto');
let md5 = crypto.createHash('md5');
let password = md5.update('123456').digest('hex')
const userSchema = new Schema({ //用户表规则
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: password
  },
  admin: { //分等级 数字代替
    type: Number,
    default: 2
  },
  photo: {
    type: String,
    default: '/images/photo/lovely.gif'
  },
  title: {
    type: Array,
    default: [{ "id": 6, "title": "员工" }]
  },
  permission: {
    menus: {
      type: Array,
      default: [
        //用户刮玻璃
        "userManage",
        //角色列表
        "roleList",
        //权限列表
        "permissionList",
        //文章列表
        "articleRanking",
        //创建文件
        "articleCreate"
      ]
    },
    points: {
      type: Array,
      default: [
        //分配角色
        "distributeRole",
        //导入员工
        "importUser",
        //删除员工
        "removeUser",
        //分配权限
        "distributePermission"
      ]
    },
  }
})

// { "id": 1, "title": "超级管理员" }
// { "id": 2, "title": "管理员" }
// { "id": 3, "title": "人事经理" }
// { "id": 4, "title": "销售经理" }
// { "id": 5, "title": "保安队长" }
// { "id": 6, "title": "员工" }

//导出userinfo 表的操作对象 以便在其他地方可以操作表  添加 查询 等操作
module.exports = mongoose.model('userinfo', userSchema)
