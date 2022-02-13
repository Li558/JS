/*
自定义Promise函数模块
*/
(function(window){
    this.status = 'pending';//给promiose对象指定status属性，初始值为pending
    this.data = undefined //给promise 对象制定一个用于存储结果数据的属性
    this.callbacks = []//每个元素的结构：{onResolved(){}, onRejected(){}}
    /*
    Promise构造函数
    excutor: 执行器函数(同步执行)
    */
    function Promise(excutor){

        //立即同步执行excutor
        //resolve函数
        function resolve(value){
            //如果当前状态不是pending 直接结束
            if(this.status === 'pedding'){
                return;
            }
            //将状态改为resolved
            this.status = 'resolved'
            //保存value数据
            this.data = value
            //如果有待执行callback函数  立即异步执行回调
            if(this.callbacks.length > 0){
                setTimeout(()=>{
                    this.callbacks.forEach(calbacksObj => {
                        calbacksObj.onResolved(value);
                    });
                });
            }
        }
        //reject函数
        function reject(reason){
            if(this.status === 'pedding'){
                return;
            }
            //将状态改为resolved
            this.status = 'rejected';
            //保存value数据
            this.data = value;
            //如果有待执行callback函数  立即异步执行回调onRejected
            if(this.callbacks.length > 0){
                setTimeout(()=>{
                    this.callbacks.forEach(calbacksObj => {
                        calbacksObj.onRejected(reason);
                    });
                });
            }
        }
        try{
            excutor(resolve, reject);

        }catch(error){//如果执行器抛出异常promise对象变为rejected
            reject(error);
        }
    }
    //原型对象的then（）指定成功和失败的回调函数  返回一个新的promise对象
    Promise.prototype.then = function(onResolved, onRejected){
        //假设当前状态还是pending状态，将回调函数保存起来
        this.callbacks.push({
            onResolved,
            onRejected
        })
    }

    //原型对象的catch（）指定成功和失败的回调函数  返回一个新的promise对象
    Promise.prototype.catch = function(onRejected){

    }
    /*
        Promise函数对象的resolve方法 返回一个指定结果的成功的promise
    */
    Promise.resolve = function(value){

    }
    //Promise函数对象的reject方法 返回一个指定的reason的 失败的promises
    Promise.reject = function(reason){

    }

    //Promise函数对象的all方法 只有放所有promise都成功时才成功  否则只要有一个失败就失败
    Promise.all = function(promises){

    }

    //Promise函数对象的race方法  返回一个promise 其结果由第一个完成的promise决定
    Promise.race = function(reason){

    }

    //向外暴露Promise函数
    window.Promise = Promise;
})(winodw)