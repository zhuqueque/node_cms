const express = require('express')

const router = express.Router()
const articleDB = require('../../database/article');

router.post('/create', async (req, res) => {
  const { title, content, describe } = req.body
  const { username } = req.session.userinfo
  const articleArr = await articleDB.find()
  console.log(articleArr);
  articleDB.create({
    title,
    content,
    describe,
    author: username,
    rank: articleArr.length + 1,
    date: Date.now()
  })
  res.send({
    code: 0,
  })
})

router.get('/list', async (req, res) => {
  const { page, size } = req.query

  const articleArr = await articleDB.find({}, {
    _id: 1,
    title: 1,
    describe: 1,
    date: 1,
    author: 1,
    rank: 1
  }, { sort: { rank: 1 } })
  const len = articleArr.length
  let resultList = articleArr.splice((page - 1) * size, size)
  res.send({
    result: resultList,
    total: len
  })


})
router.get('/articleDetail', async (req, res) => {
  const { id } = req.query
  const articleObj = await articleDB.findOne({ _id: id }, {
    _id: 1,
    title: 1,
    date: 1,
    author: 1,
    content: 1,
    describe: 1
  })

  let reg = /<img [^>]*src=['"]([^'"]+)[^>]*>/g
  articleObj.content = articleObj.content.replace(reg, '')

  res.send({
    code: 0,
    result: articleObj
  })
})

router.post('/sort', async (req, res) => {
  // 两个 数据 互换 排名 传入两个 排名 就可以了 
  const { init, final } = req.body

  let initIndex = init.rank
  let finalIndex = final.rank
  await articleDB.findOneAndUpdate({ _id: init._id }, { rank: finalIndex })
  await articleDB.findOneAndUpdate({ _id: final._id }, { rank: initIndex })

  res.send({
    code: 0,
  })
})

router.get('/delete', async (req, res) => {
  // 两个 数据 互换 排名 传入两个 排名 就可以了 
  const { id } = req.query

  await articleDB.findByIdAndDelete({ _id: id })

  res.send({
    code: 0,
  })
})
router.post('/edit', async (req, res) => {
  //修改 文章数据 
  const { title, content, describe, _id } = req.body

  await articleDB.findByIdAndUpdate({ _id }, {
    title,
    content,
    describe
  })
  res.send({
    code: 0,
  })
})
module.exports = router
