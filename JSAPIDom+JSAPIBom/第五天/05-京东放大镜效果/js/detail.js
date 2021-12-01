// 鼠标经过小图片盒子  黄色的遮挡层 和大图片盒子显示  离开隐藏2个盒子功能
// 黄色的遮挡层跟随鼠标功能
// 移动黄色遮挡层 大图片跟随移动功能
// 把鼠标坐标给遮挡层不合适 因为遮挡层坐标以父盒子为准
// 首先获得鼠标在盒子的坐标  之后用到鼠标移动事件 把top和left 放入
// 此时用到鼠标移动事件  但是还是在小图片盒子内移动
// 发现 遮挡层位置不对 需要再减去盒子自身高度和宽度的一半
// 遮挡层不能超出小图片盒子范围
// 如果小于零  就把坐标设置为0
// 如果大于遮挡层最大的移动距离  就把坐标设置为最大的移动距离
// 遮挡层的最大移动距离  自傲图片宽度减去遮挡层盒子宽度
window.addEventListener('load', function() {
    var preview_img = this.document.querySelector('.preview_img');
    var mask = this.document.querySelector('.mask');
    var big = this.document.querySelector('.big');
    //1 当鼠标经过preview_img 就显示和吟唱mask 遮挡层和big大盒子 
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';

    });
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    //2 鼠标移动的时候  让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function(e) {
        //<1> 计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        //<2> 盒子的高度  300的一半 150 保持在正中心
        //<3> 我们mask移动距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //<4> 如果x坐标小于0 就让他停在0的位置
        var maskMax = preview_img.offsetWidth - mask.offsetWidth
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
        var bigIMg = document.querySelector('.bigImg');
        //大图片最大移动距离
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        //大图片的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    });


})