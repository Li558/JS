window.addEventListener('load', function() {
    //1 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //获得focus 的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    var flag = false;
    // console.log(w);
    //2 定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    //等我们过渡完成之后  再去判断  监听过渡完成的事件 transitionend

    ul.addEventListener('transitionend', function() {
        //无缝滚动
        if (index >= 3) {
            index = 0;
            //去掉过渡效果  这样让我们的ul 快速的跳到目标位置

            ul.style.transition = 'none';
            //利用最新的索引号 诚意宽度  去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';

        } else if (index < 0) {
            // index = ul.children.length - 1;
            index = 2;
            ul.style.transition = 'none';
            //利用最新的索引号 诚意宽度  去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //3 小圆点跟随变化
        // 把ol里面li带有current类名的选出来去掉类名  remove
        // 让当前索引号的小li 加上current add
        ol.querySelector('li.current').classList.remove('current');
        //让当前索引号  的小li 加上current add
        ol.children[index].classList.add('current');
    });
    //4 手指滑动轮播图
    //触摸元素touchstart   获取手指初始位置
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        console.log(startX);
        //手指触摸时候 停止定时器
        clearInterval(timer);
    });

    //移动手指  touchmove 计算手指的滑动距离  并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        //计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        //移动盒子    盒子原来的位置 + 手指移动的距离

        var translatex = -index * w + moveX;
        //手指拖动 的时候  不需要动画效果所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true; //如果用户手指移动过我们再去判断是否不做判断效果
        e.preventDefault(); //阻止滚动屏幕的行为

    });
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            //(1) 如果移动距离大于50像素  我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                //如果右滑 就是播放上一张moveX是正值
                if (moveX > 0) {
                    index--;
                } else {
                    //如果左滑 就是播放下一张moveX是负值
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                //1 如果移动距离小于 50像素  回归
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        //当手指离开的时候重新开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });
    //返回顶部模块制作
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })

})