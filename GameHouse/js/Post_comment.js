

$(function () {
    fun();
    // 如果用户本地的token不存在
    if (!sessionStorage.getItem('usertoken')) {
        // 则执行该函数
        $('.denglu1').show();
        $('.denglu2').hide();
    } else {
        $('.denglu1').hide();
        $('.denglu2').show();
    }
    // 关灯效果
    $(".close_light").click(function () {
        if ($(".gdtb").hasClass("gdtbbh")) {
            $('.gdtb').removeClass("gdtbbh");
            $('.gdwz').removeClass("gdwzbh");
            $('.all_posts').removeClass("bh");
            $('.search').removeClass("bh");
            $('.hotsearch a').removeClass("bh");
            $('.hotsearch span').removeClass("bh");
            $('.searchkuang').removeClass("bh");
            $('.postwb').removeClass("bh");
            $('.post_game p a').removeClass("bh");
            $('.cmt-textarea-con').removeClass("bh");
            $('.commentname a').removeClass("bh");
            $('.phb .phbhead').removeClass("bh");
            $('.phb .phbnr li a').removeClass("bh");
        } else {
            $('.gdtb').addClass("gdtbbh");
            $('.gdwz').addClass("gdwzbh");
            $('.all_posts').addClass("bh");
            $('.search').addClass("bh");
            $('.hotsearch a').addClass("bh");
            $('.hotsearch span').addClass("bh");
            $('.searchkuang').addClass("bh");
            $('.postwb').addClass("bh");
            $('.post_game p a').addClass("bh");
            $('.cmt-textarea-con').addClass("bh");
            $('.commentname a').addClass("bh");
            $('.phb .phbhead').addClass("bh");
            $('.phb .phbnr li a').addClass("bh");
        }
    });
    // 帖子点赞效果
    $(".diggBtn").mouseover(function () {
        $(".diggBtn").addClass("dz");
        $('.diggBtn span').addClass("dz");
        $('.diggBtn em').addClass("dz");
        $('.diggBtn i').addClass("dz");
    });
    $(".diggBtn").mouseout(function () {
        $('.diggBtn span').removeClass("dz");
        $('.diggBtn em').removeClass("dz");
        $('.diggBtn i').removeClass("dz");
        $(".diggBtn").removeClass("dz");
    });
    $(".diggBtn").click(function () {
        var a = parseInt($('.diggBtn span').text()) + 1
        $('.diggBtn span').text(a);
    });
    // 评论点赞
    $(".commentdz123").click(function () {
        if ($(".commentdz123").hasClass("commentdz")) {
            $('.commentdz123').removeClass("commentdz");
        } else {
            $('.commentdz123').addClass("commentdz");
        }
    });
    // 回复模块
    $(".huifu").click(function () {
        $(".commenthf").show();
    });
    $(".guanbi").click(function () {
        $(".commenthf").hide();
    });






    // ajax
    function fun() {
        var biaoti = localStorage.getItem("biaoti");
        console.log(biaoti);

        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/searchallpost`,
            data: { title: biaoti },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                console.log(res.data);
                console.log(res.data2);
                console.log(res.data3);
                const htmlStr = template("html-data", res);
                $(".sywz").html(htmlStr);
            }
        });

    }






    // 需要身份验证
    // $('.commentfb').click(function () {
    //     var biaoti = localStorage.getItem("biaoti");
    //     var content = localStorage.getItem("content");
    //     console.log(biaoti);
    //     console.log(content);
    //     $.ajax({
    //         type: "post",
    //         url: `http://127.0.0.1:8888/document/postcomment`,
    //         data: { title: biaoti, content: content },
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.open({
    //                     title: "提示",
    //                     icon: 2,
    //                     content: "获取页面数据失败，请联系管理员！"
    //                 });
    //             }
    //             return layer.open({
    //                 title: "提示",
    //                 icon: 2,
    //                 content: "获取页面数据成功！"
    //             });

    //         }
    //     });

    // });








});
// 时间过滤器
template.defaults.imports.formatTime = function (data) {
    var date = new Date(data);
    let y = date.getFullYear();
    let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return `${y}-${m}-${d} ${h}:${mm}:${s}`;
};