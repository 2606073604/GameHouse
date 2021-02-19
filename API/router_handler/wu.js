// 导入数据库操作模块
const db = require('../db/mysql');
// 导入第三方密码加密模块
const bcrypt = require('bcryptjs');
// 导入第三方包token 用于生成token字符串
const jwt = require('jsonwebtoken');
// 导入用户配置token字符串模块
const config = require('../config')

// 导入注册表单数据验证模块
const checkyuserinfor = require('../struts/user');
// 导入登录表单数据验证模块
const checklogin = require('../struts/userlogin');


// 用户注册的路由处理函数
module.exports.reguser = (req, res) => {
    // 获取表单中的body数据
    const userinfor = req.body;
    // 将表单中的数据传到struts/user.js中的函数中进行表单的数据格式验证
    const err = checkyuserinfor(userinfor);
    // 把返回出来的结果进行判断
    if (err) {
        // 没有错误的话则继续往下运行
        // 有错误的话  则传到API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
        return res.ck(err);
    }
    // sql查询语句  查询username是否已经存在
    const sqlbyuname = 'SELECT * FROM user_table WHERE user_table.username=?';
    // 执行sql查询
    db.query(sqlbyuname, [userinfor.username], function (err, results) {
        // 如果出现err(错误)的话
        if (err) {
            // 则传到API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
            return res.ck(err);
        }
        // 如果没有err错误的话  那么继续往下执行
        // 判断username用户名是否存在
        if (results.length > 0) {
            // 如果查询到的结果大于0  那么表示已经被占用  
            // 把出现错误的信息传到API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
            return res.ck('该用户名已被占用，请使用其他用户名!');
        }
        // sql查询语句  查询userid是否已经存在
        const sqlbyulogid = 'SELECT * FROM user_table WHERE user_table.userid=?';
        // 执行sql查询
        db.query(sqlbyulogid, [userinfor.userid], function (err, results) {
            // 如果出现err(错误)的话
            if (err) {
                // 则传到API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
                return res.ck(err);
            }
            // 如果没有err错误的话  那么继续往下执行
            // 判断userid用户登录账号是否存在
            if (results.length > 0) {
                // 如果查询到的结果大于0  那么表示已经被占用  
                // 把出现错误的信息传到API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
                return res.ck('该用户登录账号已被占用，请使用其他账号!');
            }
            // 对用户密码进行加密处理
            // hashSync(需要进行加密的明文,随机盐的长度)
            userinfor.password = bcrypt.hashSync(userinfor.password, 10);
            // sql语句   添加数据（注册用户）
            const sql = 'INSERT INTO user_table SET ?';
            // 执行sql语句完成注册用户功能
            // 花括号内的参数就是我们经过验证，检查还有处理以后得到的数据
            db.query(sql, {
                username: userinfor.username,
                email: userinfor.email,
                userid: userinfor.userid,
                password: userinfor.password
            }, (err, results) => {
                // 老规矩判断是否出现错误
                // 如果出现err(错误)的话
                if (err) {
                    // 则传到API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
                    return res.ck(err);
                }
                // 如果没有err错误的话  那么继续往下执行
                // 判断数据库是否注册成功
                // 就是只改变了一行数据代表的是  注册成功
                if (results.affectedRows !== 1) {
                    // 如果改变的不是一行数据的话，那么我们就给客户端响应一个注册失败的信息
                    // 使用API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
                    return res.ck('注册用户失败！请稍后再试');
                }
                // 上面的一切问题错误都没有触发的话
                // 那么代表我们的注册程序执行完毕
                // 直接给客户端响应一个注册成功  并且把状态改为0
                res.ck("注册成功！", 0);
            });
        });
    });
};

// 用户登录的路由处理函数
module.exports.login = (req, res) => {
    // 接收表单数据
    const userinfor = req.body;
    // 将表单数据传到登录表单数据验证模块中进行验证
    const err = checklogin(userinfor);
    // 如果出现错误的话  
    if (err) {
        // 使用API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
        return res.ck(err);
    }
    // 定义获取用户信息的sql语句
    const sql = "SELECT * FROM user_table WHERE user_table.isdel= '0' AND user_table.userid=?";
    // 执行sql查询
    db.query(sql, userinfor.userid, (err, results) => {
        // 如果出现错误的话  
        if (err) {
            // 使用API.js中的响应数据的中间件的自定义函数中进行判断并响应给客户端
            return res.ck(err);
        }
        // 上面没有出现错误的话进入下面的判断
        if (results.length !== 1) {
            // 如果查询到的结果不是一的话则响应给客户端出现错误的信息
            return res.ck('登录失败!登录的账号不存在!请先注册以后在来登录!');
        }
        // 如果用户的账号没有问题的话
        // 检测用户密码是否正确
        // 使用compareSync方法进行判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfor.password, results[0].password);
        // 如果密码不正确的话
        if (!compareResult) {
            return res.ck('登录失败!密码输入错误!');
        }
        // 密码正确的话
        // 登录成功!创建token字符串
        // 通过ES6的结构语法将查询到的对象进行重新结构并剔除密码还有头像
        // 因为密码是隐私头像的格式过长所以剔除他两
        const userstr = { ...results[0], password: '', headerurl: '' };
        // 生成token字符串,并设置保存的时间
        const tokenstr = jwt.sign(userstr, config.jwtSecretKey, {
            expiresIn: '3d'
        });
        // 将生成的token字符串响应给客户端,让客户端保存起来  验证是不是本人的时候会使用
        res.send({
            status: 0,
            msg: '登录成功!',
            token: tokenstr
        });
    });
};

// 获取所有游戏信息的路由处理函数
module.exports.lookallgame = (req, res) => {
    const looksql = 'SELECT gamename,game_type.gametype,developers,synopsis,gamedate,gameurl FROM game join game_type on game.gametype =game_type.id';
    db.query(looksql, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        res.send({
            status: 0,
            msg: '获取所有游戏信息成功!',
            data: results
        });
    });
};

// 根据帖子的标题搜索帖子的信息的路由处理函数
module.exports.searchpost = (req, res) => {
    a = '%' + req.body.title + '%';
    const search = "SELECT username,title,content,createtime,gameid,post_type,documenturl,views,zan FROM document_table join user_table on document_table.userid =user_table.userid WHERE document_table.isdel='0' AND title LIKE ?";
    db.query(search, a, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        res.send({
            status: 0,
            msg: '根据帖子的标题搜索帖子的信息成功!',
            data: results
        });
    });
};

// 根据帖子的名称获取对应帖子的基本信息以及帖子对应的游戏和帖子的评论的接口的路由处理函数
module.exports.searchallpost = (req, res) => {
    const search = "SELECT document_table.id,username,title,content,createtime,gameid,post_type,documenturl,views,zan FROM document_table join user_table on document_table.userid =user_table.userid WHERE document_table.isdel='0' AND title=?";
    db.query(search, req.body.title, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        a = results[0].gameid;
        b = results[0].id;
        const search = "SELECT gamename,game_type.gametype,developers,synopsis,gamedate,gameurl FROM game join game_type on game.gametype=game_type.id WHERE game.gamename=?";
        db.query(search, a, (err, value) => {
            if (err) {
                return res.ck(err);
            }
            const search = "SELECT user_table.username,user_table.headerurl,post_comment.content,post_comment.date FROM post_comment join user_table on post_comment.userid=user_table.id WHERE post_comment.isdel='0' AND documentid=?";
            db.query(search, b, (err, zhi) => {
                if (err) {
                    return res.ck(err);
                }
                res.send({
                    status: 0,
                    msg: '根据帖子的名称获取对应的帖子的内容以及对应的游戏和帖子的评论成功!',
                    data: results,
                    data2: value,
                    data3: zhi
                });
            });
        });
    });
};

// 根据帖子的对应的游戏类型获取该分类下的所有帖子的基本信息的路由处理函数
module.exports.searchclass = (req, res) => {
    const sql = "SELECT * from document_table where isdel='0' AND post_type=?";
    db.query(sql, req.body.post_type, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        res.send({
            status: 0,
            msg: '根据帖子的对应的游戏类型获取该分类下的所有帖子的基本信息成功!',
            data: results
        })
    });
};

// 获取今日推荐帖子的基本信息的路由处理函数
module.exports.tuijian = (req, res) => {
    const sql = "SELECT * from document_table where isdel='0'";
    db.query(sql, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        res.send({
            status: 0,
            msg: '获取今日推荐帖子成功!',
            data: results
        })
    });
};
