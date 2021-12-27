window.onload = function() {
    var regtel = /^1[3|4|5|7|8]\d{9}$/; //手机号码的正则表达式
    var regqq = /^[1-9]\d{4,}$/; //10000
    var regnc = /^[\u4e00-\u9fa5]{0,}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd')
    regexp(tel, regtel); //手机号码
    regexp(qq, regqq); //qq号码
    regexp(nc, regnc); //昵称
    regexp(msg, regmsg); //短信验证
    regexp(pwd, regpwd); //密码


    //表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                // console.log('正确的');
                this.nextElementSibling.className = 'succes';
                this.nextElementSibling.innerHTML = '<i class="succes_icon"></i>输入正确';
            } else {
                // console.log('错误的');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>手机号码格式不正确';
            }
        }
    }
    surepwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'succes';
            this.nextElementSibling.innerHTML = '<i class="succes_icon"></i>输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>手机号码格式不正确';
        }
    }
}