function Promise(executor){

    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存实例对象的this 的值
    const self = this;//self _this that
    function resolve(data){
        if(self.PromiseState !== 'pending')return;
        //1 修改对象的状态(PromiseState)
        self.PromiseState = 'fulfilled';
        //2 设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        self.callbacks.forEach(item =>{
            item.onResolved(data);
        })

    }
    function reject(data){
        if(self.PromiseState !== 'pending')return;
        //1 修改对象的状态(PromiseState)
        self.PromiseState = 'rejected';

        //2 设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        //执行失败的回调函数
        self.callbacks.forEach(item =>{
            item.onRejected(data);
        })
    }
    //同步调用 [执行器函数]
    try{
        executor(resolve, reject);

    }catch(e){
        //修改promise 对象状态为失败
        reject(e);
    }
}

//添加then方法
Promise.prototype.then = function(onResolved, onRejected){
    const self = this;
    //判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason =>{
            throw reason;
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value;
    }
    return new Promise((resolve, reject)=>{
        function callback(type){
            try{
                //执行成功的回调函数
                let result = type(self.PromiseResult);
                if(result instanceof Promise){
                    result.then(v =>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else{
                    resolve(result);              
                }
                }catch(e){
                    reject(e);      
                }
        }
        //调用回调函数
    if(this.PromiseState === 'fulfilled'){
        callback(onResolved);
    }
    if(this.PromiseState === 'rejected'){
        callback(onRejected);
    }
    //判断pending状态
    if(this.PromiseState === 'pending'){
        //保存回调函数
        this.callbacks.push ({
            onResolved: function(){
                callback(onResolved);
            },
            onRejected: function(){
                callback(onRejected);
            }
        });
        }
    })
}

//添加catch方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected);
}

//添加resolve方法
Promise.resolve = function(value){
    //返回一个Promise对象
    return new Promise((resolve, reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            }, r=>{
                reject(r);
            });
        }else{
            //状态设置为成功
            resolve(value);
        }
    })
}


