const express = require('express')
const router = express.Router()

//登录路由
router.use("/login", require("./login"))
router.use("/getData", require("./getData"))
router.use("/user", require("./user"))
router.use("/article", require("./article"))

module.exports = router  