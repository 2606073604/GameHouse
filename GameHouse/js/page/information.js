$(function () {
    fun();
    function fun() {
        $.ajax({
            type: "get",
            url: `http://127.0.0.1:8888/user/myinfor`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("usertoken") || ""}`
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: "提示",
                        icon: 2,
                        content: "获取页面数据失败，请联系管理员！"
                    });
                }
                console.log(res.data);
                const mbyq = template("maobanyinq", res.data);
                console.log(mbyq);
                $(".tuijianmk").html(mbyq);
            }
        });
    }
});