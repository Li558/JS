//点击tab栏  可以切换效果
//点击+ 号 可以添加tab项和内容项
//点击*号 可以删除当前的tab项和内容项
// 双击tab项文字或者内容项文字，可以修改里面的文字内容
// var that;
class Tab {

    constructor(id) {
        // that = this;
        this.main = document.querySelector(id);

        this.add = this.main.querySelector('.tabadd');


        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updateNode();
        //init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab.bind(this.add, this);
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    //获取所有的晓li 和section
    //因为哦我们动态添加元素 需要重新获取对应的元素
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
        }
        //1 切换功能
    toggleTab(that) {
            that.clearClass();
            console.log(this.index);
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }
        //清除所有类和section 的操作
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //2 添加功能
    addTab(that) {
            that.clearClass();
            // 1 创建Li元素和section元素 
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试完i地位的啊我的娃 </section>';
            // 2 把这两个元素最佳到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        //3 删除功能
    removeTab(that, e) {
            e.stopPropagation(); //阻止冒泡 防止触发点击事件
            var index = this.parentNode.index;
            console.log(index);
            //根据索引号 删除对应的li 和section remove()方法可以直接删除指定的元素
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            if (document.querySelector('.liactive')) return;
            //当我们删除了选定状态的这个li 时  让它的前一个li 处于选定状态
            index--;
            //手动调用我们的点击事件 不需要鼠标触发
            that.lis[index] && that.lis[index].click();
        }
        //4 修改功能
    editTab() {
        var str = this.innerHTML;
        // alert(11);
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里面的文字处于选定状态
        //当我们离开文本框九八文本框里面的值给span
        input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }
            //按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用扁担失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }
    }

}
// var tab = new Tab('#tab');
new Tab('#tab');