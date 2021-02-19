const joi = require('@hapi/joi');

const aritle = joi.object({
    title: joi.string().required().min(1).max(40).error(new Error('请填写正确的文章标题!')),
    content: joi.string().required().allow('').error(new Error('文章内容丢失!')),
    gameid: joi.string().required().min(1).max(40).error(new Error('请填写帖子所属正确的游戏!')),
    post_type: joi.string().required().min(1).max(4).error(new Error('文章类型出错！')),
});
const deltype = joi.object({
    post_id: joi.number().integer().min(1).required().error(new Error('请输入正确的帖子编号！'))
});

module.exports.schema = {
    aritle: aritle,
    deltype: deltype
};
module.exports.validate = function (data, schema) {
    var { error, value } = schema.validate(data);
    if (error) {
        return error;
    }
    return null;
};