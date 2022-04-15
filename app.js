const express = require('express')


const app = express()

app.use(express.static('./dist'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require("./middle/mongooes")
app.use(require('./middle/cors'))
app.use(require('./middle/session'))

app.use('/', require('./router'))

app.listen(5000, () => {
  console.log('监听在 5000端口');
})
//
const userListDB = require('./database/userList');
const userDetailDB = require('./database/userDetail');


// userListDB.create({ username: '小明', admin: 2, title: '员工' })
// userListDB.create({ username: '王二丫', admin: 2, title: '员工' })
// userListDB.create({ username: '李勇', admin: 2, title: '员工' })
// userListDB.create({ username: '刘聪', admin: 2, title: '员工' })
// userListDB.create({ username: '王博文', admin: 2, title: '员工' })
// userListDB.create({ username: '丁小康', admin: 2, title: '员工' })

// 生成 detail项
// userListDB.find().then(result => {

//   result.forEach((item) => {
//     userDetailDB.create({
//       username: item.username,
//       title: item.title,
//       photo: item.photo,
//       userId: item._id,
//       mobile: item.mobile,
//       gender: '男'
//     })
//   })

// })


