// 导入express模块
const express = require("express");
// 创建一个express服务器对象
const app = express();
// 导入cors中间件
const cors = require("cors");
// 将cors注册为全局的中间件
app.use(cors());
// 配置解析表单数据的中间件
app.use(express.urlencoded({ express: false }));


// 导入游戏路由模块
const gameRouter = require('./router/game');
// 注册游戏路由模块
app.use('/game', gameRouter);



// 导入解析token的中间件
const expressjwt = require("express-jwt");
// 导入解析使用的secrekey
const config = require('./config');
app.use('/uploads', express.static('./uploads'));
// 响应数据的中间件(出现错误代码的优化处理)
app.use(function (req, res, next) {
    // status=0代表成功，status=1代表失败，默认将status的值设置为1，
    // 自定义的函数名字叫ck
    res.ck = function (err, status = 1) {
        // 自定义函数中的参数err是当res.ck被调用时传进来的错误信息
        // status是状态,默认为1
        res.send({
            // 服务器的响应
            status: status,
            // 响应的状态是1,因为传进来的错误信息代表注册失败
            msg: (err instanceof Error ? err.message : err)
            // msg就是服务器响应给客户端的信息是什么
            // 这里我们需要进行判断
            // 如果是error类型的话  那么代表是用户的输入格式问题  不符合我们的要求
            // 如果是err.message的话  那么代表是用户输入的用户名或者用户登录账号被注册了   
        });
    };
    // 继续往下执行
    next();
});


// 对路由进行判断是否需要验证身份(user路由不需要身份验证)
app.use(expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/wu\//] }));

// 导入无需身份验证的模块
const wuRouter = require("./router/wu");
// 注册无需身份验证的模块
app.use('/wu', wuRouter);

// 导入用户路由模块
const userRouter = require("./router/user");
// 注册用户路由模块
app.use('/user', userRouter);

// 导入文章路由模块
const userinforRouter = require("./router/document");
// 注册文章路由模块
app.use('/document', userinforRouter);

// 导入评论路由模块
const articleRouter = require('./router/comment');
// 注册评论路由模块
app.use('/comment', articleRouter);


// TO DO List(待办事项)



app.use(function (err, req, res, next) {
    // 捕获token认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.ck('身份认证失败!');
    }
    next();
});


// 调用app的listen方法,指定端口号并开启服务器
app.listen(8888, '127.0.0.1', () => {
    console.log("服务器开启成功!访问http://127.0.0.1:8888");
});