
$(function () {
    $("#aritcle-pub").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8888/document/releasepost",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("usertoken") || ""}`
            },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.open({
                        title: '提示',
                        icon: 2,
                        content: res.msg
                    });
                }
                layer.open({
                    title: '提示',
                    icon: 1,
                    content: "帖子发布成功！",
                });
            }
        });
    });
});