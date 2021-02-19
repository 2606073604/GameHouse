// 导入第三方包
// 对表单中的数据进行验证
// 进一步筛选然后发送给服务器
const joi = require('@hapi/joi');
// 做重置密码格式的验证规则
// 对输入的三次密码格式进行验证判断
const schema = joi.object({
    // 使用upwd这个规则，验证req.body.oldpwd的值
    oldpwd: joi.string().min(6).max(18).required().error(new Error('密码为6-18位任意字符！')),
    // joi.ref('oldpwd'):代表newpwd的值必须和oldpwd的值保持一致
    // joi.not(joi.ref('oldpwd')):代表newpwd的值不能和oldpwd的值相同
    // concat():用户合并joi.not(joi.ref('oldpwd'))验证规则和
    newpwd: joi.string().min(6).max(18).required().error(new Error('密码为6-18位任意字符！')),
    aginpwd: joi.any().valid(joi.ref('newpwd')).required().error(new Error('重复密码和新密码不一致'))
});
// 做重置密码的判断的验证规则
// 验证三次密码中第一次不能和第二次一样
// 第二次必须和第三次一样
const schemapwd = joi.object({
    oldpwd: joi.string().min(6).max(18).required().error(new Error('密码为6-18位任意字符！')),
    newpwd: joi.not(joi.ref('oldpwd')).error(new Error("新密码不能和旧密码相同！")),
    aginpwd: joi.any().valid(joi.ref('newpwd')).required().error(new Error('重复密码和新密码不一致'))
});
// 获取传进来的表单中的数据为data
module.exports = function (data) {
    // 对传进来的三个数据首先进行格式验证
    var {
        error,
        value
    } = schema.validate(data);
    // 有错误返回错误
    if (error) {
        return error;
    }
    // 没有错误的话  继续往下走
    // 对传进来的三个数据进行第二次的验证
    // 验证三次密码中第一次不能和第二次一样
    // 第二次必须和第三次一样
    var { error, value } = schemapwd.validate(data);
    // 有错误返回错误
    // 没有错误返回null
    if (error) {
        return error;
    }
    return null;
};