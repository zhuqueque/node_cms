const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()


router.get('/feature', (request, response) => {
  const lan = request.headers['accept-language']

  const featureData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dataJson/feature.json'), 'utf8'))
  let data = featureData[lan]

  response.send(data)
})
router.get('/chapter', (request, response) => {
  const lan = request.headers['accept-language']
  const chapterData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dataJson/chapter.json'), 'utf8'))
  let data = chapterData[lan]
  response.send(data)
})
router.get('/allPermission', (request, response) => {
  const permissionData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dataJson/permission.json'), 'utf8'))

  response.send(permissionData)
})


module.exports = router


