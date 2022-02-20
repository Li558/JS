//声明一个变量a 同时指定它 的类型的number
var a;
var b;
//a 的类型设置微number 在以后的使用过程中a的值只能是数字
a = 10;
a = 33;
// a = 'hello';此代码会报错 因为变量a的类型的number 不能赋值字符串
//b 
// b = 123;
//声明完变量直接进行赋值
// let c: boolean = true;
var c = true;
c = true;
//JS中的函数不考虑参数的类型和个数
// function sum(a, b){
//     return a + b;
// }
// console.log(sum(123, 456));
// console.log(sum(123, '456'));
function sum(a, b) {
    return a + b;
}
console.log(sum(123, 456));
// console.log(sum(123, '456'));
var result = sum(123, 456);
