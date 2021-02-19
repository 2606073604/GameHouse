const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user');

// 获取用户信息的接口
router.get('/myinfor', userHandler.myinfor);
// 修改用户信息的接口
router.post('/updateuser', userHandler.updateuser);
// 重置密码的接口
router.post('/repwd', userHandler.repwd);
// 修改图像的接口
router.post('/avatar', userHandler.updateavatar);
// 验证验证码并且返回新的token值
router.post('/yzecode', userHandler.yzecode);


// 将router共享出去
module.exports = router;