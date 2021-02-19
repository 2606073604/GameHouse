// 导入数据库操作模块
const db = require('../db/mysql');

// 导入path路径模块
const path = require('path');

// 导入添加分类验证模块
const ckarttype = require("../struts/articletype")


// 用户登录以后发布帖子的路由处理函数
module.exports.releasepost = (req, res) => {
    if (!req.file || req.file.fieldname == null) {
        return res.ck('文章封面图片未选择');
    }
    const err = ckarttype.validate(req.body, ckarttype.schema.aritle);
    if (err) {
        return res.ck(err);
    }
    const articleinfor = {
        ...req.body,
        documenturl: path.join('/uploads', req.file.filename),
        createtime: new Date(),
        userid: req.user.userid
    };
    const sql = 'INSERT INTO document_table SET ?';
    db.query(sql, articleinfor, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        if (results.affectedRows !== 1) {
            return res.ck('发布文章失败！');
        }
        res.ck('发布文章成功！', 0);
    });
};

// 修改自己帖子的路由处理函数
module.exports.modifypost = (req, res) => {
    res.send('123')
};

// 删除自己帖子的路由处理函数
module.exports.delpost = (req, res) => {
    const err = ckarttype.validate(req.body, ckarttype.schema.deltype);
    if (err) {
        return res.ck(err);
    }
    const sql = 'UPDATE document_table SET isdel="1" WHERE id=?';
    db.query(sql, req.body.post_id, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        if (results.affectedRows !== 1) {
            return res.ck('删除文章失败！');
        }
        res.ck('删除文章成功！', 0);
    });
};

// 帖子点赞的路由处理函数
module.exports.postzan = (req, res) => {
    const sql = "SELECT * from document_table where isdel='0' AND title=?";
    db.query(sql, req.body.title, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        var a = results[0].zan;
        b = parseInt(a) + 1
        const aql = "UPDATE document_table SET zan=? WHERE title=?";
        db.query(aql, [b, req.body.title], (err, results) => {
            if (err) {
                return res.ck(err);
            }
            if (results.affectedRows !== 1) {
                return res.ck('点赞失败!');
            }
            res.ck('点赞成功!', 0);
        });
    });
};

// 发布帖子评论的路由处理函数
module.exports.post_comment = (req, res) => {
    const search = "SELECT * FROM document_table WHERE isdel='0' AND title=?";
    db.query(search, req.body.title, (err, results) => {
        if (err) {
            return res.ck(err);
        }
        b = results[0].id;
        const articleinfor = {
            ...req.body,
            date: new Date(),
            userid: req.user.id,
            documentid: b

        };
        const sql = 'INSERT INTO post_comment SET ?';
        db.query(sql, articleinfor, (err, results) => {
            if (err) {
                return res.ck(err);
            }
            if (results.affectedRows !== 1) {
                return res.ck('发布评论失败！');
            }
            res.ck('发布评论成功！', 0);
        });
    });
};
