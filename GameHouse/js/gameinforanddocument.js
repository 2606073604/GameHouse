window.onload = function () {
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
    console.log(localStorage.getItem("gamename"));
    var a = 0;
    $('.close_light').click(function () {
        if (a == 0) {
            $('.close_light .gdtb').css('background-position', 'center -25px');
            $('.close_light .gdwz').css('background-position', 'center -21px');
            $('.main').css('background-color', 'black')
            $('.main').css('color', 'white')
            $('.main a').css('color', 'white')
            $('.layui-card').css('background-color', 'black')
            $('strong').css('color', 'white')
            $('.layui-tab-title li').css('color', 'white')
            $('.pinglunbyme input').css('color', 'black')
            a += 1;
        } else {
            $('.close_light .gdtb').css('background-position', 'center 0');
            $('.close_light .gdwz').css('background-position', 'center 0');
            $('.main').css('background-color', 'white')
            $('.main').css('color', 'black')
            $('.main a').css('color', 'white')
            $('.layui-card').css('background-color', 'white')
            $('strong').css('color', 'black')
            $('.layui-tab-title li').css('color', 'black')
            $('.gamenews ul li a').css('color', 'black')
            a -= 1;
        }
    })
}


// ajax
function fun() {
    var gamename = localStorage.getItem("gamename");
    // var gamename = '我的世界'
    $.ajax({
        type: "post",
        url: `http://127.0.0.1:8888/game/getgamebygamename`,
        data: { gamename: gamename },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.open({
                    title: "提示",
                    icon: 2,
                    content: "获取页面数据失败，请联系管理员！"
                });
            }
            const htmlStr = template("html-data", res);
            $(".gamelittleinfor").html(htmlStr);
        }
    });

    // 评论内容的渲染
    $.ajax({
        type: "post",
        url: `http://127.0.0.1:8888/game/getcommentbygameid`,
        data: { gamename: gamename },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.open({
                    title: "提示",
                    icon: 2,
                    content: "获取页面数据失败，请联系管理员！"
                });
            }
            const htmlStr = template("html-data1", res);
            $(".gamepinglun").html(htmlStr);
        }
    });

    // 文章攻略渲染
    // $.ajax({
    //     type: "post",
    //     url: `http://127.0.0.1:8888/game/getdocumentbygameid`,
    //     data: { gamename: gamename },
    //     success: function (res) {
    //         console.log(res);
    //         if (res.status !== 0) {
    //             return layer.open({
    //                 title: "提示",
    //                 icon: 2,
    //                 content: "获取页面数据失败，请联系管理员！"
    //             });
    //         }
    //         const htmlStr = template("html-data2", res);
    //         $(".gamewenzhang").html(htmlStr);
    //     }
    // });
}



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