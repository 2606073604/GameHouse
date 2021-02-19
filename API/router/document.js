const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/document');

// 导入multer模块
const multer = require('multer');
// 导入path路径模块
const path = require('path');
// 创建multer对象,dest属性:指定文件存放的路径地址
const upload = multer({ dest: path.join(__dirname, '../uploads') });






// 用户登录以后发布帖子的接口
router.post('/releasepost', upload.single('documenturl'), articleHandler.releasepost);


// 修改自己帖子的接口
router.post('/modifypost', articleHandler.modifypost);

// 删除自己帖子的接口
router.post('/delpost', articleHandler.delpost);

// 帖子点赞的接口
router.post('/postzan', articleHandler.postzan);

// 发布帖子评论的接口
router.post('/postcomment', articleHandler.post_comment);



// 将router共享出去
module.exports = router;