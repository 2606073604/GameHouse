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
    var a = 0;
    $('.close_light').click(function () {
        if (a == 0) {
            $('.close_light .gdtb').css('background-position', 'center -25px');
            $('.close_light .gdwz').css('background-position', 'center -21px');
            $('.main').css('background-color', 'black');
            $('.main').css('color', 'white');
            $('h2').css('color', 'white');
            $('h3').css('color', 'white');
            $('.main a').css('color', 'white');
            $('.search span').css('color', 'white')
            $('.search').css('background', 'black')
            $('#tiezi').css('background', 'black').css('color', 'white')
            a += 1;
        } else {
            $('.close_light .gdtb').css('background-position', 'center 0');
            $('.close_light .gdwz').css('background-position', 'center 0');
            $('.main').css('background-color', 'white');
            $('.main').css('color', 'black');
            $('h2').css('color', 'black');
            $('h3').css('color', 'black');
            $('.main a').css('color', 'black');
            $('.search span').css('color', 'black')
            $('.search').css('background', '#e5e5e5')
            $('#tiezi').css('background', 'white').css('color', 'black')
            a -= 1;
        }
    })


}

function fun() {
    var gametype = localStorage.getItem("gametype");
    // var gametype = '网络游戏'
    $('.gamebiaoti').text(gametype)

    $.ajax({
        type: "post",
        url: `http://127.0.0.1:8888/game/getgamebytype`,
        data: { gametype: gametype },
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
            $(".gameinforbytype").html(htmlStr);
        }
    });
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