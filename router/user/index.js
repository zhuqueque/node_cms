const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const userListDB = require('../../database/userList');
const userDetailDB = require('../../database/userDetail');

router.get('/userList', async (request, response) => {
  const { page, size } = request.query

  const result = await userListDB.find({}, {
    _id: 1,
    title: 1,
    photo: 1,
    username: 1,
    mobile: 1
  })
  const len = result.length
  let resultList = result.splice((page - 1) * size, size)
  response.send({
    result: resultList,
    total: len
  })
})
router.post('/uploadUser', async (request, response) => {
  const uploadArr = request.body
  if (!uploadArr || !uploadArr.length) return

  // 需要遍历一下 是否有重复 数据 重复数据内是否有需要修改的数据 
  const result = await userListDB.find({}, {
    _id: 1,
    title: 1,
    photo: 1,
    username: 1,
    mobile: 1
  })

  result.forEach(item => {
    //去除数据库重复项 
    [...uploadArr].forEach((item2, index) => {
      if (item.username === item2.username) {
        uploadArr.splice(index, 1)
      }
    })
  })
  uploadArr.forEach(async item => {
    await userListDB.create(item)
  })

  response.send({
    code: 0,
    len: uploadArr.length
  })
})

router.post('/deleteUser', async (request, response) => {

  let userId = request.body._id
  await userListDB.findByIdAndRemove(userId)

  response.send({
    code: 0,
    txt: '删除成功'
  })
})
router.get('/allUserList', async (request, response) => {
  const result = await userListDB.find({}, {
    _id: 1,
    title: 1,
    photo: 1,
    username: 1,
    mobile: 1
  })

  response.send({
    code: 0,
    data: result
  })
})

router.post('/getUserDetail', async (request, response) => {

  const id = request.body.id
  const result = await userDetailDB.find({ userId: id })

  response.send({
    code: 0,
    data: result[0]
  })
})
router.get('/rolesList', async (request, response) => {

  const data = fs.readFileSync(path.join(__dirname, '../../dataJson/roles.json'), 'utf8')

  response.send({
    code: 0,
    data: JSON.parse(data)
  })
})


module.exports = router


