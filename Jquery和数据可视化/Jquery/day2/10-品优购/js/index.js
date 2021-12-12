$(function() {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    // var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".recom").offset().top;
    if ($(document).scrollTop() >= toolTop) {
        $(".fixedtool").fadeIn();
        // $(".fixedtool").show();
    } else {
        $(".fixedtool").fadeOut();
        // $(".fixedtool").hide();
    }
})