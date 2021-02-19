const joi = require('@hapi/joi');
const addtype = joi.object({
    type: joi.string().required().min(2).max(10).error(new Error('请填写正确的文章类型！'))
});
const deltype = joi.object({
    id: joi.number().integer().min(1).required().error(new Error('请填写文章类型对应的id！'))
});

const updtype = joi.object({
    type: joi.string().required().min(2).max(10).error(new Error('请填写正确的文章类型！')),
    id: joi.number().integer().min(1).required().error(new Error('请填写文章类型对应的id！'))

});

const aritle = joi.object({
    title: joi.string().required().min(1).max(40).error(new Error('请填写正确的文章标题!')),
    content: joi.string().required().allow('').error(new Error('文章内容丢失!')),
    type_id: joi.number().integer().min(1).required().error(new Error('文章类型出错！')),
    status: joi.string().valid('未查封', '已查封').required().error(new Error('文章状态异常!')),
});

const lookid = joi.object({
    id: joi.number().integer().min(1).required().error(new Error('请输入正确的id!')),
});

const looklogin = joi.object({
    ulogin: joi.number().integer().min(1).required().error(new Error('请输入正确的用户id!')),
});

const updtyper = joi.object({
    type: joi.string().required().min(2).max(10).error(new Error('请填写正确的文章类型！')),
    id: joi.number().integer().min(1).required().error(new Error('请填写文章类型对应的id！'))

});

const lookiddoc = joi.object({
    id: joi.number().integer().min(1).required().error(new Error('请输入正确的id!')),
    doc: joi.string().error(new Error('请输入文本内容!'))
});

module.exports.schema = {
    addtype: addtype,
    deltype: deltype,
    updtype: updtype,
    aritle: aritle,
    lookid: lookid,
    updtyper: updtyper,
    lookiddoc: lookiddoc,
    looklogin: looklogin
};
module.exports.validate = function (data, schema) {
    var { error, value } = schema.validate(data);
    if (error) {
        return error;
    }
    return null;
};