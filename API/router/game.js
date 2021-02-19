// 导入express模块
const express = require('express');
// 导入router模块
const router = express.Router();
// 导入路由函数模块
const gameHandler = require('../router_handler/game');

// 创建通过分类获取该分类游戏列表的接口
router.post('/getgamebytype', gameHandler.getgamebytype);
// 创建通过游戏名获取游戏的信息的接口
router.post('/getgamebygamename', gameHandler.getgamebygamename);
// 创建通过文章名获取文章的内容和信息的接口
router.post('/getdocument', gameHandler.getdocument);
// 根据游戏的id获取该游戏的所有评论的信息
router.post('/getcommentbygameid', gameHandler.getcommentbygameid);
// 根据用户id来获取用户的基本信息
router.post('/getuserinforbyuserid', gameHandler.getuserinforbyuserid);
// 根据游戏的id获取该游戏的所有文章的信息
router.post('/getdocumentbygameid', gameHandler.getdocumentbygameid);

// 添加游戏的接口(需要管理员token)
router.post('/addgame', gameHandler.addgame);
// 删除游戏的接口(需要管理员token)
router.post('/delgame', gameHandler.delgame);

// 将router共享出去
module.exports = router;