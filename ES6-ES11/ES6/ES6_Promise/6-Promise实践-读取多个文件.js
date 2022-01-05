//引入fs模块 
const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path/posix");

// s

//使用promise 实现
const p = new Promise((resolve, reject) => {
    fs.readFile('./resources/为学.md', (err, data) => {
        resolve(data);
    });
});


p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./resources/插秧诗.md', (err, data) => {
            resolve([value, data]);
        });
    });
    // console.log(value.toString());

}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./resources/观书有感.md', (err, data) => {
            //压入
            value.push(data);
            resolve(value);

        });
    });
}).then(value => {
    console.log(value.join('\r\n'));
});