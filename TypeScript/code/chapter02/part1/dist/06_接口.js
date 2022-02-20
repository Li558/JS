"use strict";
(function () {
    const obj = {
        name: 'ss',
        age: 11,
        gender: '男'
    };
    /**
     * 定义类, 可以使类去实现一个接口
     *
     */
    class MyClass {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log('大家好~~');
        }
    }
})();
