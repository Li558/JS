var a;
a = 10;
var b;
b = "male";
b = "female";
var c;
c = true;
c = 'hello';
//any表达的是任意类型，一个变量设置类型any后相当于对该变量关闭了TS的类型检测
//使用TS时，不建议使用any类型
//如果不指出指定类型 TS解析器会自动判断变量的类型微any (隐式的any)
var d;
d = 10;
d = 'hello';
d = true;
//unknown表示未知类型的值
var e;
e = 10;
