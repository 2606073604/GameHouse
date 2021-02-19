// 导入第三方包
// 对表单中的数据进行验证
// 进一步筛选然后发送给服务器
const joi = require('@hapi/joi');
// 做修改用户信息的验证规则
const schema = joi.object({
    id: joi.number().integer().min(1).required().error(new Error('用户信息暂时无法修改！')),
    uname: joi.string().required().error(new Error('输入用户名格式有误！')),
    uemail: joi.string().required().pattern(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).error(new Error('输入邮箱格式有误！')),
    ulogin: joi.string().alphanum().min(6).max(11).required().error(new Error('输入登录账号格式有误！')),
    unick: joi.string().max(16).error(new Error('用户昵称格式有误！'))
});
// 获取传进来的表单中的数据为data
module.exports = function (data) {
    // 对传进来的数据进行判断验证
    var { error, value } = schema.validate(data);
    // 有错误返回错误
    // 没有错误返回null
    if (error) {
        return error;
    }
    return null;
};