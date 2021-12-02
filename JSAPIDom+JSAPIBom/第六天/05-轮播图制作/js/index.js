//鼠标经过轮播图 左右按钮显示  离开吟唱左右按钮 
//点击右侧按钮一次  图片网左播放一张 以此内推 左侧按钮同理
//图片播放的同时 下面的小圆圈模块跟随一起变化
//点击小圆圈 可以播放相应图片
//鼠标不经过轮播图 轮播图特惠播放图片
//鼠标经过轮播图模块 自动播放停止
window.addEventListener('load', function() {
    //1 获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //2 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    });
    //离开时 隐藏左右按钮
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = this.setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    //3 动态生成小圆圈  有几张图片 就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号  通过自定义属性来做
        li.setAttribute('index', i);
        //把小li插入到ol里面
        ol.appendChild(li);
        //4 小圆圈的排他思想 我们可以直接再生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            //干掉所有人  把所有的小li 清除current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己 当前小li 设置current 类名
            this.className = 'current';
            // animate(obj, target, callback);
            //ul的移动距离  小圆圈的索引号诚意图片宽度 负值
            //当我们点击了某个小li 就拿到了当前小li的索引号
            var index = this.getAttribute('index');
            //当我们点击率某个小li 就要把这个li的索引号给num
            num = index;
            //当我们点击率某个小li 就要把这个li的索引号给circle
            circle = index;
            var focusWidth = focus.offsetWidth;
            console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })

    }

    //ol里面的第一个小li 设置类名为current
    ol.children[0].className = 'current';
    //6 克隆第一张图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7 点击右侧和左侧按钮进行图片切换
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    //flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            //如果走到了最后复制的一张图片  此时 我们的ul 要快速复原left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            //8 点击右侧按钮  小圆圈跟随一起变化  可以在声明一个变量控制小圆圈的播放
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    //左侧按钮的做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到了最后复制的一张图片  此时 我们的ul 要快速复原left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            //8 点击右侧按钮  小圆圈跟随一起变化  可以在声明一个变量控制小圆圈的播放
            circle--;
            //如果circle  < 0 说明第一张图片 则小圆圈改为第四个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length-1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    var circleChange = function() {
        //先清除其余小圆圈 的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current 类名
        ol.children[circle].className = 'current';
    }

    //10 自动播放轮播图
    var timer = this.setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})