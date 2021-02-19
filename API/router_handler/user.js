// 导入数据库模块
const db = require("../db/mysql");
// 导入对数据进行加密的包
const bcrypt = require("bcryptjs");
// 导入生成token的jwt模块
const jwt = require("jsonwebtoken");
// 导入配置模块
const config = require("../config");
// 导入修改个人信息的表单验证
const ckupdate = require('../checkym/userupdate');
// 导入修改密码的表单验证
const ckpwd = require('../checkym/userpwd');
// 导入修改图像的表单验证
const ckavatar = require('../checkym/avatar');



//获取用户信息的路由处理函数
module.exports.myinfor = (req, res) => {
    // 为了防止用户密码泄密，查询基本信息除过密码
    const sql = 'SELECT * FROM user_table WHERE id=?';
    // 调用query方法查询用户对象的信息
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        if (results.length !== 1) {
            return res.ck('获取用户信息失败！');
        }
        // 将用户信息响应给客户端
        res.send({
            status: 0,
            msg: '获取用户信息成功！',
            data: results[0]
        });
    });
}
// 更改用户信息的路由处理函数
module.exports.updateuser = (req, res) => {
    const err = ckupdate(req.body);
    if (err) {
        return res.ck(err);
    }
    // 表单验证通过
    const sql = 'UPDATE user_table SET ? WHERE id=?';
    db.query(sql, [req.body, req.user.id], (err, results) => {
        if (err) {
            return res.ck(err);
        }
        if (results.affectedRows !== 1) {
            return res.ck('修改用户信息失败，请稍后再试！');
        }
        return res.ck('基本信息修改成功！', 0);
    });
};
// 重置用户密码的路由处理函数
module.exports.repwd = (req, res) => {
    console.log(req.body)
    const err = ckpwd(req.body);
    if (err) {
        return res.ck(err);
    }
    // 通过Token中的Id获取用户的数据，根据获取到的数据库密码和写的旧密码做对比
    const sql = "SELECT * FROM user_table WHERE id=?";
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        if (results.length !== 1) {
            return res.ck('用户不存在！');
        }
        // 判断旧密码是否和数据库密码一致
        const compareResult = bcrypt.compareSync(req.body.oldpwd, results[0].upwd);
        if (!compareResult) {
            return res.ck('原始密码错误！');
        }
        // 对密码进行修改
        const newpwd = bcrypt.hashSync(req.body.newpwd, 10);
        db.query(sqlpwd, [newpwd, req.user.id], (err, resultpwd) => {
            if (err) {
                return res.ck(err);
            }
            if (resultpwd.affectedRows !== 1) {
                return res.ck('修改密码失败！');
            }
            res.ck('修改密码成功！', 0);
        });
    });
};
// 修改图像的路由处理函数
module.exports.updateavatar = (req, res) => {
    const err = ckavatar(req.body);
    if (err) {
        return res.ck(err);
    }
    // 实现修改用户图像的功能
    const sql = 'UPDATE ym_users SET upicimage=? WHERE id=?';
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) {
            return res.ck(err);
        }
        if (results.affectedRows !== 1) {
            return res.ck('修改头像失败！');
        }
        res.ck('修改头像成功！', 0);
    });
};
// 验证邮箱动态码的路由处理函数
module.exports.yzecode = (req, res) => {
    if (req.user.islogin) {
        return res.ck("请重新找回密码！");
    }
    // 如果邮箱动态码不一致
    if (req.user.code !== req.body.code) {
        console.log(req.user.code);
        console.log(req.body.code);
        return res.ck("邮箱动态码错误,请重新输入的邮箱动态码!");
    }
    // 如果一致,则生成新的token,用于进行找回密码的下一步操作
    const userStr = {
        id: req.user.id,
        islogin: false
    };
    const tokenStr = jwt.sign(userStr, config.jwtSecretkey, {
        expiresIn: '10m'
    });
    res.send({
        status: 0,
        msg: "邮箱动态码验证成功!",
        token: tokenStr
    });
}
// 重置密码的路由处理函数
module.exports.resetpwd = (req, res) => {
    if (req.user.islogin) {
        return res.ck("请重新找回密码!");
    }
    const userInfo = req.body;
    const ckresetpwd = require("../checkym/resetpwd");
    const err = ckresetpwd(userInfo);
    if (err) {
        return res.ck(err);
    }
    const sql = "SELECT * FROM user_table WHERE id = ?";
    db.query(sql, [req.user.id], (err, result) => {
        if (err) {
            return res.ck(err);
        }
        if (result.length !== 1) {
            return res.ck("用户不存在,请稍后再试！");
        }
        // 执行修改密码操作
        const sqleditpwd = "UPDATE user_table SET password = ? WHERE id = ?";
        // 对新密码进行加密
        userInfo.aginpwd = bcrypt.hashSync(userInfo.aginpwd, 10);
        db.query(sqleditpwd, [userInfo.aginpwd, req.user.id], (err, results) => {
            if (err) {
                return res.ck(err);
            }
            if (results.affectedRows !== 1) {
                return res.ck("重置密码失败,请稍后再试！");
            }
            res.ck("重置密码成功！", 0);
        });
    });
}