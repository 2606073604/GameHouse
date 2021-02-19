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
// 上传或修改用户头像的验证规则
const schema = joi.object({
    // dataUri():确保数据格式为“data:image/png;base64,xxxxxxxxx”格式
    avatar: joi.string().dataUri().required().error(new Error('请选择图像'))
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