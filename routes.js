const express = require('express')
const { handleCnt, getPost, getUsers } = require('./controllers')
const router = express.Router()

router.param('cnt',handleCnt)

router.get('/users',getUsers)

router.get('/posts/:cnt',getPost)

module.exports = router