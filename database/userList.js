//创建表规则 得到表操作对象
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userListSchema = new Schema({ //用户表规则
  username: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    default: '188XXXX1000'
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
        "userManage",
        "roleList",
        "permissionList",
        "articleRanking",
        "articleCreate"
      ]
    },
    points: {
      type: Array,
      default: [
        "distributeRole",
        "importUser",
        "removeUser",
        "distributePermission"
      ]
    },
  }
})

//导出userinfo 表的操作对象 以便在其他地方可以操作表  添加 查询 等操作
module.exports = mongoose.model('userList', userListSchema)
