// import * as m1 from "./hello.js";
//获取元素
const btn = document.getElementById('btn');

btn.onclick = function(){
    //动态引入
    import('./hello.js').then(module =>{
        console.log(module);
        alert(11);
    });
}
//提高执行的效率