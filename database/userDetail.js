//创建表规则 得到表操作对象
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userDetailSchema = new Schema({ //用户表规则
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
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
    default: [{ id: 6, title: '员工' }]
  },
  gender: {
    type: String,
    required: true
  },
  // 备注
  remark: {
    type: Array,
    default: ['员工']
  },
  experience: {
    type: Array,
    default: [{ "startTime": "2018/10", "endTime": "2019/03", "title": "铁锤网", "desc": "混合开发京东商城" }, { "startTime": "2021/03", "endTime": "2021/07", "title": "铁锤网", "desc": "uni-app 开发企业级小程序" }]
  },
  nationality: {
    type: String,
    default: '汉'
  },
  address: {
    type: String,
    default: '长沙市xxxx区xxx街道xxx小区xxxx室'
  }


})

//导出userinfo 表的操作对象 以便在其他地方可以操作表  添加 查询 等操作
module.exports = mongoose.model('userDetail', userDetailSchema)
