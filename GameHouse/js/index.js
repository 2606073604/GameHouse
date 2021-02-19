
$(function () {

    // 如果用户本地的token不存在
    if (!sessionStorage.getItem('usertoken')) {
        // 则执行该函数
        $('.denglu1').show();
        $('.denglu2').hide();
    } else {
        $('.denglu1').hide();
        $('.denglu2').show();
    }
    $.ajax({
        type: "GET",
        url: "/user/myinfor",
        headers: {
            Authorization: `${sessionStorage.getItem("usertoken") || ""}`
        },
        success: function (res) {
            // 判断如果根据token获取用户信息失败的话，要跳转到登录界面，
            // if (res.status !== 0) {
            //     layer.open({
            //         title: '提示',
            //         icon: 2,
            //         content: "用户登录信息无效，请重新登录！",
            //         time: 2000,
            //         end: function () {
            //             location.href = "./login.html";
            //         }
            //     });
            // } else {
            //     renderAvatar(res.data);
            // }
        }
    });




});
