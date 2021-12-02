window.addEventListener('load', function() {
    //1 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //获得focus 的宽度
    var w = focus.offsetWidth;
    // console.log(w);
    //2 定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);

})