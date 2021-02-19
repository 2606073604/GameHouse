$(function () {
    $(".dbbs").mouseover(function () {
        $(this).addClass('layui-this');
    });
    $(".dbbs").mouseout(function () {
        $(this).removeClass('layui-this');
    });
})