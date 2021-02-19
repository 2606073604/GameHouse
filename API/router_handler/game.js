// 导入数据库模块
const db = require('../db/mysql');


// 创建获取该分类为的所有游戏的基本信息的接口函数
module.exports.getgamebytype = (req, res) => {
    const sql = "SELECT id FROM game_type WHERE gametype=?"
    db.query(sql, req.body.gametype, (err, results) => {
        if (err) {
            return res.ck(err)
        }
        if (results.length == 1) {
            const sql = 'SELECT id,gamename,gamedate,gameurl FROM game WHERE gametype=?'
            db.query(sql, results[0].id, (err, result) => {
                if (err) {
                    return res.ck(err)
                }
                return res.send({
                    status: 0,
                    msg: '获取该分类游戏列表成功!',
                    data: result
                })
            })
        } else {
            res.send({
                status: 1,
                msg: '该游戏分类不存在!',
            })
        }
    })
}

// 创建通过游戏名获取游戏信息的接口函数
module.exports.getgamebygamename = (req, res) => {
    const sql = 'SELECT * FROM game WHERE gamename=?'
    db.query(sql, req.body.gamename, (err, results) => {
        if (err) {
            return res.ck(err)
        }
        if (results.length == 1) {
            return res.send({
                status: 0,
                msg: '获取该游戏信息成功!',
                data: results
            })
        } else {
            res.send({
                status: 1,
                msg: '该游戏不存在!',
            })
        }
    })
}

// 获取通过文章的id来获取文章的内容和信息
module.exports.getdocument = (req, res) => {
    const sql = 'SELECT * FROM document_table WHERE id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) {
            return res.ck(err)
        }
        if (results.length == 1) {
            if (results[0].isdel == 0) {
                return res.send({
                    status: 0,
                    msg: '获取文章信息成功!',
                    data: results
                })
            } else {
                return res.send({
                    status: 1,
                    msg: '该文章已被删除!',
                })
            }
        } else {
            res.send({
                status: 1,
                msg: '该文章不存在!',
            })
        }
    })
}

// 根据游戏的id获取游戏的所有评论内容
module.exports.getcommentbygameid = (req, res) => {
    const sql = 'SELECT * FROM game_comment join game on game_comment.gameid =game.id WHERE game.gamename=?'
    db.query(sql, req.body.gamename, (err, results) => {
        if (err) {
            return res.send(err)
        }
        if (results.length > 0) {
            if (results[0].isdel == 0) {
                return res.send({
                    status: 0,
                    msg: '获取游戏评论信息成功!',
                    data: results
                })
            } else {
                return res.send({
                    status: 1,
                    msg: '该游戏评论已被删除!'
                })
            }
        } else {
            return res.send('该游戏暂无评论!')
        }
    })
}

// 根据用户id来获取用户的基本信息
module.exports.getuserinforbyuserid = (req, res) => {
    const sql = 'SELECT * FROM user_table WHERE id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) {
            return res.ck(err)
        }
        if (results.length == 1) {
            if (results[0].isdel == 0) {
                return res.send({
                    status: 0,
                    msg: '获取用户信息成功!',
                    data: results
                })
            } else {
                return res.send({
                    status: 1,
                    msg: '该用户已被删除!'
                })
            }
        } else {
            res.send({
                status: 1,
                msg: '该用户信息异常!'
            })
        }
    })
}

// 通过游戏的id来获取该游戏所有的文章信息以及作者信息
module.exports.getdocumentbygameid = (req, res) => {
    const sql = 'SELECT * FROM document_table join game on document_table.gameid =game.id WHERE game.gamename=?';
    db.query(sql, req.body.gameid, (err, results) => {
        if (err) {
            return res.send(err)
        }
        if (results.length > 0) {
            if (results[0].isdel == 0) {
                return res.send({
                    status: 0,
                    msg: '获取该游戏文章信息成功!',
                    data: results
                })
            } else {
                return res.send({
                    status: 1,
                    msg: '该文章已被删除!'
                })
            }
        } else {
            res.send({
                status: 1,
                msg: '该游戏暂无文章!'
            })
        }
    })
}


// // 添加游戏的接口
module.exports.addgame = (req, res) => {
    // 先对登录的账号进行查询看是否属于管理员账号
    sql = 'SELECT * FROM user_table where id=?'
    db.query(sql, req.body.userid, (err, results) => {
        if (err) {
            return res.ck(err)
        }
        // 判断该用户是否是管理员
        if (results.length == 1) {
            if (results[0].isdel == 0) {
                if (results[0].usertype == 1) {
                    // 判断添加的游戏是否存在
                    sql = 'SELECT * FROM game WHERE gamename=?'
                    db.query(sql, req.body.gamename, (err, result) => {
                        if (result.length == 0) {
                            // 游戏不存在,进行添加游戏
                            const gameinfor = {
                                id: req.body.id,
                                gamename: req.body.gamename,
                                gametype: req.body.gametype,
                                developers: req.body.developers,
                                synopsis: req.body.synopsis,
                                gamedate: new Date(),
                                gameurl: req.body.gameurl
                            }
                            const sql = 'INSERT INTO game SET ?'
                            db.query(sql, gameinfor, (err, resultss) => {
                                if (err) {
                                    return res.send(err)
                                }
                                // 判断是否受影响的行数为1
                                if (resultss.affectedRows == 1) {
                                    return res.send({
                                        status: 0,
                                        msg: '添加游戏信息成功信息成功!'
                                    })
                                } else {
                                    return res.send({
                                        status: 1,
                                        msg: '添加游戏信息信息异常,请稍后重试!'
                                    })
                                }
                            })
                        } else {
                            return res.send
                                ({
                                    status: 0,
                                    msg: '该游戏已存在!'
                                })
                        }
                    })
                } else {
                    return res.send
                        ({
                            status: 0,
                            msg: '该用户不是管理员!'
                        })
                }
            } else {
                return res.send
                    ({
                        status: 0,
                        msg: '该用户不存在!'
                    })
            }
        } else {
            return res.send
                ({
                    status: 0,
                    msg: '未找到该用户!'
                })
        }
    })
}

// 删除游戏信息的接口
module.exports.delgame = (req, res) => {
    // 先对登录的账号进行查询看是否属于管理员账号
    sql = 'SELECT * FROM user_table where id=?'
    db.query(sql, req.body.userid, (err, results) => {
        if (err) {
            return res.ck(err)
        }
        // 判断该用户是否是管理员
        if (results.length == 1) {
            if (results[0].isdel == 0) {
                if (results[0].usertype == 1) {
                    // 判断添加的游戏是否存在
                    sql = 'SELECT * FROM game WHERE gamename=?'
                    db.query(sql, req.body.gamename, (err, result) => {
                        if (result.length == 1) {
                            // 游戏存在,进行游戏的删除
                            const sql = 'delete from game where gamename=?'
                            db.query(sql, req.body.gamename, (err, results) => {
                                if (err) {
                                    return res.send(err)
                                }
                                if (results.affectedRows !== 1) {
                                    return res.send({
                                        status: 1,
                                        msg: '删除游戏信息异常!请检查该游戏是否存在!'
                                    });
                                } else {
                                    return res.send({
                                        status: 0,
                                        msg: '删除游戏信息成功!'
                                    });
                                }
                            })
                        } else {
                            return res.send({
                                status: 1,
                                msg: '该游戏不存在存在!'
                            })
                        }
                    })
                } else {
                    return res.send({
                        status: 1,
                        msg: '该用户不是管理员!'
                    })
                }
            } else {
                return res.send({
                    status: 1,
                    msg: '该用户不存在!'
                })
            }
        } else {
            return res.send({
                status: 1,
                msg: '未找到该用户!'
            })
        }
    })
}