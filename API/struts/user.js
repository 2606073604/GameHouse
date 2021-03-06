// ------------------------------------------------------------------注册表单验证------------------------------------------------------------------
// 导入第三方包
// 对表单中的数据进行验证
// 进一步筛选然后发送给服务器
const joi = require('@hapi/joi');
/* 
 string(),数据必须为字符串
 alphanum(),值只能包含a-z，A-Z，0-9的字符
 min(length),值最小长度
 max(length),值最大长度
 required(),值为必填项，不能为undefined
 pattern(正则表达式)，值必须要符合正则表达式要求
*/
// 注册表单中各个数据的验证规则
const schema = joi.object({
    username: joi.string().required().error(new Error('输入用户名格式有误！')),
    email: joi.string().required().pattern(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).error(new Error('输入邮箱格式有误！')),
    userid: joi.string().alphanum().min(6).max(11).required().error(new Error('输入登录账号格式有误！')),
    password: joi.string().min(6).max(18).required().error(new Error('用户密码为6-18位任意字符！'))
});
// 获取传进来的表单中的数据为data
module.exports = function (data) {
    // 对传进来的数据进行判断验证
    var { error, value } = schema.validate(data);
    // 进行判断如果有错误的话
    if (error) {
        // 返回错误信息
        return error;
    }
    // 没有错误的话  返回空null
    return null;
};