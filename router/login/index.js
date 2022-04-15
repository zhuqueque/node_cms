const express = require('express')

const router = express.Router()
const userDB = require('../../database/userinfo');

router.post('/', async (req, res) => {
  let { username, password } = req.body

  //查询 数据库中是否存在用户名
  let result = await userDB.findOne({ username }) //有数据返回数据对象 无数据就会返回null

  if (result) {
    //有存在相同数据  有重名数据 则返回重名
    if (result.password === password) {
      //登录成功
      //将用户的信息数据存到 session中
      let userinfo = {
        username: result.username,
        admin: result.admin,
        _id: result._id,
        photo: result.photo,
        permission: result.permission
      }
      req.session.userinfo = userinfo;
      //响应 把session带上
      res.send({
        code: 0,
        txt: '登录成功',
        data: userinfo
      })
    } else {//密码不匹配
      res.send({
        code: 2,
        txt: '密码不正确'
      })
    }
  } else {
    //用户不存在 请先注册
    res.send({
      code: 3,
      txt: '用户名不存在,请先注册'
    })
  }

})

// 检查登录 持久登录
router.get('/isCheck', (req, res) => {
  let data = req.session.userinfo;
  if (data) {
    res.send({
      code: 0,
      txt: '已经登录',
      data
    })
  } else {
    res.send({
      code: 1,
      txt: '未登录',
      data: {}
    })
  }
})

//退出登录
router.post('/quitLogin', (req, res) => {
  // console.log(1);
  req.session.destroy()
  res.send({
    code: 0,
    txt: '已退出登录'
  })
})
module.exports = router
