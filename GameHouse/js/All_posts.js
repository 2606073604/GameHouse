
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
    $(".close_light").click(function () {
        if ($(".gdtb").hasClass("gdtbbh")) {
            $('.gdtb').removeClass("gdtbbh");
            $('.gdwz').removeClass("gdwzbh");
            $('.all_posts').removeClass("bh");
            $('.search').removeClass("bh");
            $('.hotsearch a').removeClass("bh");
            $('.hotsearch span').removeClass("bh");
            $('.searchkuang').removeClass("bh");
            $('.sywz .post_neirong li .tzbt a:last-child').removeClass("bh");
            $('.sywz .post_neirong li .tzjj').removeClass("bh");
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
            $('.sywz .post_neirong li .tzbt a:last-child').addClass("bh");
            $('.sywz .post_neirong li .tzjj').addClass("bh");
            $('.phb .phbhead').addClass("bh");
            $('.phb .phbnr li a').addClass("bh");
        }
    });
    $('.danji').click(function () {
        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/searchclass`,
            data: { post_type: $('.danji').text() },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                const htmlStr = template("html-data", res);
                $(".post_neirong").html(htmlStr);
            }
        });
    });
    $('.wangluo').click(function () {
        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/searchclass`,
            data: { post_type: $('.wangluo').text() },
            success: function (res) {

                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                const htmlStr = template("html-data", res);
                $(".post_neirong").html(htmlStr);
            }
        });
    });
    $('.zhuji').click(function () {
        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/searchclass`,
            data: { post_type: $('.zhuji').text() },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                const htmlStr = template("html-data", res);
                $(".post_neirong").html(htmlStr);
            }
        });
    });
    $('.shouji').click(function () {
        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/searchclass`,
            data: { post_type: $('.shouji').text() },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                const htmlStr = template("html-data", res);
                $(".post_neirong").html(htmlStr);
            }
        });
    });
    // 今日推荐
    $('.tuijian').click(function () {
        fun();
    });
    function fun() {
        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/tuijian`,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                const htmlStr = template("html-data123", res);
                $(".tuijianmk").html(htmlStr);
            }
        });
    }

    $('.searchkuang123').click(function () {
        $.ajax({
            type: "post",
            url: `http://127.0.0.1:8888/wu/searchpost`,
            data: { title: $('.searchkuang').val() },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                const htmlStr = template("html-data123", res);
                $(".tuijianmk").html(htmlStr);
            }
        });
    });



























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