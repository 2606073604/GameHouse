const express = require('express');
const router = express.Router();
const wu = require('../router_handler/wu');


// 创建注册新用户的接口
router.post('/reguser', wu.reguser);

// 创建登录的接口
router.post('/login', wu.login);

// 获取所有游戏信息的接口
router.get('/lookallgame', wu.lookallgame);

// 根据帖子的标题搜索帖子的信息的接口
router.post('/searchpost', wu.searchpost);

// 根据帖子的名称获取对应帖子的基本信息以及帖子对应的游戏和帖子的评论的接口
router.post('/searchallpost', wu.searchallpost);

// 根据帖子的对应的游戏类型获取该分类下的所有帖子的基本信息的接口
router.post('/searchclass', wu.searchclass);

// 获取今日推荐帖子的基本信息接口
router.post('/tuijian', wu.tuijian);






// 将router共享出去
module.exports = router;