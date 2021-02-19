//导入myspl模块
const mysql = require('mysql');
// 创建数据库的连接对象
const db = mysql.createPool({
    // 数据库IP地址
    host: '127.0.0.1',
    // 登录数据库账号
    user: 'root',
    // 登录数据库密码
    password: '584521',
    // 指定要操作的数据库
    database: 'gamehouse'
});
// 将db对象共享
module.exports = db;